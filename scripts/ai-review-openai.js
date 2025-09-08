#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// OpenAI API 사용을 위한 설정
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4';

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
 * OpenAI API를 사용하여 AI 리뷰를 실행합니다
 */
async function runOpenAIReview(file, content) {
  if (!OPENAI_API_KEY) {
    log.warning('OPENAI_API_KEY가 설정되지 않았습니다. 규칙 기반 리뷰를 실행합니다.');
    return await runRuleBasedReview(file, content);
  }

  try {
    const prompt = `
다음 ${file} 파일을 .cursorrules에 정의된 팀 규칙에 따라 리뷰해주세요.

파일 내용:
\`\`\`
${content}
\`\`\`

리뷰 기준:
1. 가독성: 네이밍이 직관적이고 복잡한 로직이 분리되었는가?
2. 예측 가능성: 반환 타입이 일관되고 에러 처리가 적절한가?
3. 응집성: 단일 책임 원칙을 지키고 있는가?
4. 결합도: 불필요한 의존성이 없고 유지보수성이 높은가?
5. 성능: 불필요한 리렌더링이나 메모리 누수가 없는가?
6. 보안: 민감한 정보가 노출되지 않는가?
7. 접근성: 스크린 리더와 키보드 사용자를 고려했는가?
8. 타입 안전성: TypeScript 타입이 올바르게 정의되었는가?

심각도 기준:
- CRITICAL: 보안 취약점, 메모리 누수, 런타임 에러 가능성
- HIGH: 성능 문제, 타입 안전성 위반, 접근성 문제
- MEDIUM: 코드 품질 개선, 가독성 향상 필요
- LOW: 스타일 가이드 위반, 최적화 제안

JSON 형태로 응답해주세요:
{
  "issues": [
    {
      "line": 라인번호,
      "severity": "CRITICAL|HIGH|MEDIUM|LOW",
      "message": "문제 설명",
      "suggestion": "구체적인 수정 제안 (코드 예시 포함)"
    }
  ],
  "summary": {
    "critical": 0,
    "high": 0,
    "medium": 0,
    "low": 0
  }
}
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          {
            role: 'system',
            content:
              '당신은 경험 많은 코드 리뷰어입니다. 주어진 코드를 팀 규칙에 따라 분석하고 구체적인 개선 제안을 제공합니다.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.1,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API 오류: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // JSON 파싱
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('AI 응답에서 JSON을 찾을 수 없습니다.');
    }

    const result = JSON.parse(jsonMatch[0]);
    return {
      file,
      issues: result.issues || [],
      summary: result.summary || { critical: 0, high: 0, medium: 0, low: 0 },
    };
  } catch (error) {
    log.warning(`OpenAI API 호출 실패: ${error.message}`);
    return await runRuleBasedReview(file, content);
  }
}

/**
 * 규칙 기반 리뷰 (OpenAI API가 없을 때 사용)
 */
async function runRuleBasedReview(file, content) {
  const issues = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    // 간단한 규칙 기반 검사
    if (line.includes('any') && !line.includes('//')) {
      issues.push({
        line: lineNumber,
        severity: 'HIGH',
        message: 'any 타입 사용으로 타입 안전성이 보장되지 않습니다',
        suggestion: `적절한 타입을 정의하세요. 예: const data: string = value;`,
      });
    }

    if (line.includes('console.log') && !line.includes('//')) {
      issues.push({
        line: lineNumber,
        severity: 'MEDIUM',
        message: 'console.log가 프로덕션 코드에 남아있습니다',
        suggestion: `개발용 로그는 제거하거나 조건부로 실행하세요. 예: if (process.env.NODE_ENV === 'development') console.log(data);`,
      });
    }

    if (line.length > 100) {
      issues.push({
        line: lineNumber,
        severity: 'LOW',
        message: '라인이 너무 깁니다 (100자 초과)',
        suggestion: `라인을 분리하여 가독성을 높이세요.`,
      });
    }

    if (line.includes('TODO') || line.includes('FIXME')) {
      issues.push({
        line: lineNumber,
        severity: 'MEDIUM',
        message: 'TODO/FIXME 주석이 남아있습니다',
        suggestion: `프로덕션 배포 전에 TODO/FIXME를 해결하거나 이슈로 등록하세요.`,
      });
    }
  });

  const summary = {
    critical: issues.filter(i => i.severity === 'CRITICAL').length,
    high: issues.filter(i => i.severity === 'HIGH').length,
    medium: issues.filter(i => i.severity === 'MEDIUM').length,
    low: issues.filter(i => i.severity === 'LOW').length,
  };

  return {
    file,
    issues,
    summary,
  };
}

/**
 * 파일 내용을 읽어옵니다
 */
function readFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    log.warning(`파일을 읽을 수 없습니다: ${filePath}`);
    return null;
  }
}

/**
 * 터미널에서 직접 AI 리뷰를 실행합니다
 */
async function runDirectAIReview(files) {
  log.info('🤖 터미널에서 직접 AI 리뷰를 실행합니다...');

  const reviewResults = [];

  for (const file of files) {
    log.info(`📝 ${file} 리뷰 중...`);

    const content = readFileContent(file);
    if (!content) continue;

    try {
      const reviewResult = await runOpenAIReview(file, content);
      reviewResults.push(reviewResult);
    } catch (error) {
      log.warning(`${file} 리뷰 중 오류 발생: ${error.message}`);
    }
  }

  return reviewResults;
}

/**
 * 메인 실행 함수
 */
async function main() {
  console.log(`${colors.bold}${colors.cyan}🤖 AI 코드 리뷰 시스템 (OpenAI)${colors.reset}\n`);

  // 스테이징된 파일 가져오기
  let stagedFiles;
  try {
    const output = execSync('git diff --cached --name-only', { encoding: 'utf8' });
    stagedFiles = output
      .trim()
      .split('\n')
      .filter(file => file.length > 0);
  } catch (error) {
    log.error('스테이징된 파일을 가져오는데 실패했습니다.');
    return;
  }

  if (stagedFiles.length === 0) {
    log.info('스테이징된 파일이 없습니다.');
    return;
  }

  // 파일 필터링
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

  const filteredFiles = stagedFiles.filter(file => {
    return !excludePatterns.some(pattern => pattern.test(file));
  });

  if (filteredFiles.length === 0) {
    log.info('리뷰할 파일이 없습니다. (테스트/빌드 파일 제외)');
    return;
  }

  log.info(`리뷰 대상 파일: ${filteredFiles.length}개`);
  filteredFiles.forEach(file => log.info(`  - ${file}`));

  // AI 리뷰 실행
  try {
    const reviewResults = await runDirectAIReview(filteredFiles);

    // 결과 분석 및 출력
    let totalCritical = 0;
    let totalHigh = 0;
    let totalMedium = 0;
    let totalLow = 0;
    let allIssues = [];

    reviewResults.forEach(result => {
      totalCritical += result.summary.critical;
      totalHigh += result.summary.high;
      totalMedium += result.summary.medium;
      totalLow += result.summary.low;

      result.issues.forEach(issue => {
        allIssues.push({
          file: result.file,
          ...issue,
        });
      });
    });

    // 결과 출력
    console.log(`\n${colors.bold}${colors.cyan}📊 AI 리뷰 결과${colors.reset}`);
    console.log(`🚨 CRITICAL: ${totalCritical}개`);
    console.log(`🔴 HIGH: ${totalHigh}개`);
    console.log(`🟡 MEDIUM: ${totalMedium}개`);
    console.log(`🔵 LOW: ${totalLow}개`);

    if (allIssues.length > 0) {
      console.log(`\n${colors.bold}📋 발견된 이슈:${colors.reset}`);
      allIssues.forEach((issue, index) => {
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
        console.log(`   ${colors.bold}문제:${colors.reset} ${issue.message}`);
        console.log(`   ${colors.bold}제안:${colors.reset} ${issue.suggestion}`);
      });
    }

    // 결정에 따른 처리
    if (totalCritical > 0 || totalHigh > 0) {
      console.log(`\n${colors.red}${colors.bold}🚨 커밋이 차단되었습니다.${colors.reset}`);
      console.log(`CRITICAL: ${totalCritical}개, HIGH: ${totalHigh}개 이슈를 먼저 수정해주세요.`);
      process.exit(1); // 커밋 차단
    } else if (totalMedium > 0 || totalLow > 0) {
      console.log(
        `\n${colors.yellow}${colors.bold}⚠️ 경고: ${totalMedium + totalLow}개 이슈가 발견되었습니다.${colors.reset}`,
      );
      console.log(`커밋은 진행되지만 개선을 권장합니다.`);
    } else {
      console.log(`\n${colors.green}${colors.bold}✅ 모든 검사를 통과했습니다.${colors.reset}`);
    }
  } catch (error) {
    log.error(`AI 리뷰 중 오류 발생: ${error.message}`);
    process.exit(1);
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
