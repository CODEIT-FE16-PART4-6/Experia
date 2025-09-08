#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 환경 변수 확인
const AI_REVIEW_ENABLED = process.env.AI_REVIEW === 'true';
const REVIEW_TIMEOUT = parseInt(process.env.REVIEW_TIMEOUT) || 300000; // 5분 기본값
const MAX_DIFF_SIZE = parseInt(process.env.MAX_DIFF_SIZE) || 1000; // 1000줄 기본값

// 색상 출력을 위한 유틸리티
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

const log = {
  info: msg => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: msg => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: msg => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: msg => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  critical: msg => console.log(`${colors.red}${colors.bold}🚨${colors.reset} ${msg}`),
};

/**
 * 스테이징된 파일 목록을 가져옵니다
 */
function getStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-only', { encoding: 'utf8' });
    return output
      .trim()
      .split('\n')
      .filter(file => file.length > 0);
  } catch (error) {
    log.error('스테이징된 파일을 가져오는데 실패했습니다.');
    return [];
  }
}

/**
 * 파일을 필터링합니다 (테스트/빌드 산출물 제외)
 */
function filterFiles(files) {
  const excludePatterns = [
    /\.test\.(ts|tsx|js|jsx)$/,
    /\.spec\.(ts|tsx|js|jsx)$/,
    /\.stories\.(ts|tsx|js|jsx)$/,
    /\.d\.ts$/,
    /node_modules/,
    /\.next/,
    /dist/,
    /build/,
    /coverage/,
    /\.git/,
    /package-lock\.json$/,
    /yarn\.lock$/,
    /\.env/,
    /\.log$/,
  ];

  return files.filter(file => {
    return !excludePatterns.some(pattern => pattern.test(file));
  });
}

/**
 * 변경사항의 크기를 확인합니다
 */
function checkDiffSize(files) {
  try {
    const output = execSync(`git diff --cached --stat`, { encoding: 'utf8' });
    const lines = output.split('\n');
    const totalChanges = lines
      .filter(line => line.includes('|'))
      .reduce((sum, line) => {
        const match = line.match(/(\d+)\s*[+-]/);
        return sum + (match ? parseInt(match[1]) : 0);
      }, 0);

    return totalChanges;
  } catch (error) {
    log.warning('변경사항 크기를 확인할 수 없습니다.');
    return 0;
  }
}

/**
 * ESLint/TypeScript 폴백 리뷰를 실행합니다
 */
function runFallbackReview(files) {
  log.info('ESLint/TypeScript 폴백 리뷰를 실행합니다...');

  try {
    // ESLint 실행
    execSync('npx eslint --ext .ts,.tsx,.js,.jsx .', { stdio: 'inherit' });
    log.success('ESLint 검사 완료');
  } catch (error) {
    log.warning('ESLint에서 문제가 발견되었습니다.');
  }

  try {
    // TypeScript 타입 체크
    execSync('npx tsc --noEmit', { stdio: 'inherit' });
    log.success('TypeScript 타입 체크 완료');
  } catch (error) {
    log.warning('TypeScript 타입 체크에서 문제가 발견되었습니다.');
  }
}

/**
 * AI 리뷰 작업 파일을 생성합니다
 */
function createReviewTaskFile(files) {
  const taskContent = {
    timestamp: new Date().toISOString(),
    files: files,
    rules: '.cursorrules',
    instructions: [
      '다음 파일들을 .cursorrules에 정의된 팀 규칙에 따라 리뷰해주세요.',
      '각 이슈에 대해 CRITICAL, HIGH, MEDIUM, LOW 중 하나의 심각도를 부여해주세요.',
      'CRITICAL/HIGH: 코드 차단이 필요한 심각한 문제',
      'MEDIUM/LOW: 개선 권장사항',
      '결과를 JSON 형태로 반환해주세요.',
    ],
    outputFormat: {
      issues: [
        {
          file: '파일 경로',
          line: '라인 번호',
          severity: 'CRITICAL|HIGH|MEDIUM|LOW',
          message: '문제 설명',
          suggestion: '개선 제안',
        },
      ],
      summary: {
        critical: 'CRITICAL 이슈 개수',
        high: 'HIGH 이슈 개수',
        medium: 'MEDIUM 이슈 개수',
        low: 'LOW 이슈 개수',
      },
    },
  };

  const taskFile = path.join(process.cwd(), '.ai-review-task.json');
  fs.writeFileSync(taskFile, JSON.stringify(taskContent, null, 2));

  return taskFile;
}

/**
 * AI 리뷰 결과 파일을 확인합니다
 */
function waitForReviewResult(taskFile, timeout = REVIEW_TIMEOUT) {
  const resultFile = taskFile.replace('.json', '-result.json');
  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    const checkInterval = setInterval(() => {
      if (fs.existsSync(resultFile)) {
        clearInterval(checkInterval);
        try {
          const result = JSON.parse(fs.readFileSync(resultFile, 'utf8'));
          resolve(result);
        } catch (error) {
          reject(new Error('리뷰 결과 파일을 파싱할 수 없습니다.'));
        }
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkInterval);
        reject(new Error('리뷰 시간이 초과되었습니다.'));
      }
    }, 1000);
  });
}

/**
 * 리뷰 결과를 분석하고 결정을 내립니다
 */
function analyzeReviewResult(result) {
  if (!result || !result.summary) {
    log.warning('리뷰 결과를 분석할 수 없습니다.');
    return { action: 'pass', message: '리뷰 결과 분석 실패' };
  }

  const { critical = 0, high = 0, medium = 0, low = 0 } = result.summary;

  if (critical > 0 || high > 0) {
    return {
      action: 'block',
      message: `🚨 커밋이 차단되었습니다. CRITICAL: ${critical}, HIGH: ${high}개 이슈 발견`,
      issues:
        result.issues?.filter(
          issue => issue.severity === 'CRITICAL' || issue.severity === 'HIGH',
        ) || [],
    };
  } else if (medium > 0 || low > 0) {
    return {
      action: 'warn',
      message: `⚠️ 경고: MEDIUM: ${medium}, LOW: ${low}개 이슈 발견 (커밋은 진행됩니다)`,
      issues:
        result.issues?.filter(issue => issue.severity === 'MEDIUM' || issue.severity === 'LOW') ||
        [],
    };
  } else {
    return {
      action: 'pass',
      message: '✅ 모든 검사를 통과했습니다. 커밋을 진행합니다.',
    };
  }
}

/**
 * 이슈를 출력합니다
 */
function printIssues(issues) {
  if (!issues || issues.length === 0) return;

  console.log('\n📋 발견된 이슈:');
  issues.forEach((issue, index) => {
    const severityColor =
      {
        CRITICAL: colors.red,
        HIGH: colors.red,
        MEDIUM: colors.yellow,
        LOW: colors.blue,
      }[issue.severity] || colors.reset;

    console.log(
      `\n${index + 1}. ${severityColor}${issue.severity}${colors.reset} - ${issue.file}:${issue.line}`,
    );
    console.log(`   ${issue.message}`);
    if (issue.suggestion) {
      console.log(`   💡 제안: ${issue.suggestion}`);
    }
  });
}

/**
 * 메인 실행 함수
 */
async function main() {
  console.log(`${colors.bold}${colors.cyan}🤖 AI 코드 리뷰 시스템${colors.reset}\n`);

  // 1. AI 리뷰가 활성화되어 있는지 확인
  if (!AI_REVIEW_ENABLED) {
    log.info('AI_REVIEW 환경 변수가 설정되지 않았습니다. AI 리뷰를 건너뜁니다.');
    return;
  }

  // 2. 스테이징된 파일 가져오기
  const stagedFiles = getStagedFiles();
  if (stagedFiles.length === 0) {
    log.info('스테이징된 파일이 없습니다.');
    return;
  }

  // 3. 파일 필터링
  const filteredFiles = filterFiles(stagedFiles);
  if (filteredFiles.length === 0) {
    log.info('리뷰할 파일이 없습니다. (테스트/빌드 파일 제외)');
    return;
  }

  log.info(`리뷰 대상 파일: ${filteredFiles.length}개`);
  filteredFiles.forEach(file => log.info(`  - ${file}`));

  // 4. 변경사항 크기 확인
  const diffSize = checkDiffSize(filteredFiles);
  if (diffSize > MAX_DIFF_SIZE) {
    log.warning(`변경사항이 너무 큽니다 (${diffSize}줄). 폴백 리뷰를 실행합니다.`);
    runFallbackReview(filteredFiles);
    return;
  }

  // 5. AI 리뷰 작업 파일 생성
  const taskFile = createReviewTaskFile(filteredFiles);
  log.info(`AI 리뷰 작업 파일 생성: ${taskFile}`);

  // 6. 사용자에게 안내
  console.log(`\n${colors.bold}${colors.magenta}📝 다음 단계를 수행해주세요:${colors.reset}`);
  console.log(`1. Cursor에서 ${taskFile} 파일을 엽니다`);
  console.log(`2. Ctrl/Cmd + I를 눌러 AI에게 리뷰를 요청합니다`);
  console.log(`3. AI가 리뷰를 완료하면 결과 파일이 생성됩니다`);
  console.log(`\n⏱️  대기 시간: ${REVIEW_TIMEOUT / 1000}초`);

  try {
    // 7. 리뷰 결과 대기
    const result = await waitForReviewResult(taskFile, REVIEW_TIMEOUT);

    // 8. 결과 분석
    const analysis = analyzeReviewResult(result);

    // 9. 결과 출력
    console.log(`\n${colors.bold}${analysis.message}${colors.reset}`);

    if (analysis.issues) {
      printIssues(analysis.issues);
    }

    // 10. 결정에 따른 처리
    if (analysis.action === 'block') {
      process.exit(1); // 커밋 차단
    } else if (analysis.action === 'warn') {
      // 경고만 출력하고 커밋 진행
      log.info('경고가 있지만 커밋을 진행합니다.');
    } else {
      log.success('모든 검사를 통과했습니다.');
    }
  } catch (error) {
    log.error(`리뷰 중 오류 발생: ${error.message}`);
    log.info('폴백 리뷰를 실행합니다.');
    runFallbackReview(filteredFiles);
  } finally {
    // 임시 파일 정리
    try {
      if (fs.existsSync(taskFile)) {
        fs.unlinkSync(taskFile);
      }
      const resultFile = taskFile.replace('.json', '-result.json');
      if (fs.existsSync(resultFile)) {
        fs.unlinkSync(resultFile);
      }
    } catch (error) {
      // 파일 정리 실패는 무시
    }
  }
}

// 스크립트 실행
if (require.main === module) {
  main().catch(error => {
    log.error(`스크립트 실행 중 오류: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { main };
