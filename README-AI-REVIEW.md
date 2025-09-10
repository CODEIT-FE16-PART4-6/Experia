# 🤖 AI 코드 리뷰 시스템

Experia 팀을 위한 Cursor AI 기반 자동 코드 리뷰 시스템입니다.

## 🎯 목표

- **IDE에서 바로 확인**: Cursor에서 실시간으로 코드 리뷰 진행
- **커밋 순간 자동 리뷰**: pre-commit 훅을 통한 자동화
- **팀 규칙 기반**: `.cursorrules` 파일 기반 일관성 유지
- **차단/경고 시스템**: 심각도에 따른 자동 판단

## 🚀 빠른 시작

### 1. 시스템 설정

```bash
# 설정 스크립트 실행
./scripts/setup-ai-review.sh
```

### 2. 커밋 방법 선택

#### **방법 1: 대화형 커밋 (추천)**

```bash
git add .
npm run commit:interactive
# 또는
./scripts/commit-helper.sh
```

#### **방법 2: AI 리뷰와 함께 커밋**

```bash
git add .
AI_REVIEW=true git commit -m "feat: 새 기능"
# 또는
npm run commit:ai -m "feat: 새 기능"
```

#### **방법 3: 일반 커밋 (AI 리뷰 없음)**

```bash
git add .
git commit -m "feat: 새 기능"
# 또는
npm run commit:normal -m "feat: 새 기능"
```

### 3. AI 리뷰만 실행

```bash
npm run ai-review
```

## 📋 사용 흐름

### 커밋 프로세스

#### **대화형 커밋 (추천)**

1. **파일 스테이징**: `git add .`
2. **대화형 커밋 실행**: `npm run commit:interactive`
3. **AI 리뷰 여부 선택**: 대화형 메뉴에서 선택
4. **커밋 메시지 입력**: 프롬프트에 입력
5. **자동 실행**: 선택에 따라 AI 리뷰 또는 일반 커밋

#### **AI 리뷰와 함께 커밋**

1. **파일 스테이징**: `git add .`
2. **AI 리뷰 커밋**: `AI_REVIEW=true git commit -m "feat: 새 기능"`
3. **Cursor에서 리뷰**: AI 작업 파일이 자동으로 열림
4. **리뷰 진행**: `Ctrl/Cmd + I`로 AI에게 리뷰 요청
5. **결과 확인**: 심각도에 따라 차단/경고/통과

#### **일반 커밋 (AI 리뷰 없음)**

1. **파일 스테이징**: `git add .`
2. **일반 커밋**: `git commit -m "feat: 새 기능"`
3. **완료**: lint-staged만 실행되고 커밋 완료

## 🔧 설정

### 환경 변수

`.env.local` 파일에 다음 설정을 추가하세요:

```env
# AI 리뷰 설정
AI_REVIEW=true                    # AI 리뷰 활성화
REVIEW_TIMEOUT=300000            # 리뷰 대기 시간 (5분)
MAX_DIFF_SIZE=1000               # 최대 변경사항 크기 (1000줄)
```

### 팀 규칙 수정

`.cursorrules` 파일을 편집하여 팀의 코딩 규칙을 정의할 수 있습니다.

## 📊 리뷰 결과

### 심각도 기준

- **🚨 CRITICAL**: 보안 취약점, 메모리 누수, 런타임 에러
- **🔴 HIGH**: 성능 문제, 타입 안전성 위반, 접근성 문제
- **🟡 MEDIUM**: 코드 품질 개선, 가독성 향상 필요
- **🔵 LOW**: 스타일 가이드 위반, 최적화 제안

### 결과 처리

- **CRITICAL/HIGH**: ❌ 커밋 차단
- **MEDIUM/LOW**: ⚠️ 경고 (커밋 진행)
- **없음**: ✅ 커밋 완료

## 🏗️ 시스템 구조

```
├── .cursorrules                 # 팀 코딩 규칙
├── .husky/
│   └── pre-commit              # pre-commit 훅
├── scripts/
│   ├── ai-review.js            # AI 리뷰 메인 스크립트
│   ├── review-template.md      # 리뷰 템플릿
│   └── setup-ai-review.sh      # 설정 스크립트
└── package.json                # npm 스크립트 설정
```

## 🔍 리뷰 기준

### 프론트엔드 규칙

- **가독성**: 직관적인 네이밍, 복잡한 로직 분리
- **예측 가능성**: 일관된 반환 타입, 적절한 에러 처리
- **응집성**: 단일 책임 원칙 준수
- **결합도**: 최소한의 의존성, 높은 유지보수성

### 모노레포 규칙

- **패키지 구조**: 도메인 단위 관리
- **의존성 관리**: Yarn workspace 기반
- **성능 최적화**: 번들 크기 관리

## 🚨 문제 해결

### AI 리뷰가 작동하지 않는 경우

1. **환경 변수 확인**

   ```bash
   echo $AI_REVIEW
   ```

2. **Cursor 설치 확인**
   - Cursor가 설치되어 있는지 확인
   - `.cursorrules` 파일이 존재하는지 확인

3. **권한 확인**
   ```bash
   ls -la scripts/ai-review.js
   chmod +x scripts/ai-review.js
   ```

### 대용량 변경사항 처리

변경사항이 너무 클 경우 자동으로 ESLint/TypeScript 폴백 리뷰가 실행됩니다.

```bash
# 최대 변경사항 크기 조정
export MAX_DIFF_SIZE=2000
```

### 타임아웃 조정

```bash
# 리뷰 대기 시간 조정 (밀리초)
export REVIEW_TIMEOUT=600000  # 10분
```

## 📝 커스터마이징

### 새로운 리뷰 규칙 추가

`.cursorrules` 파일에 새로운 규칙을 추가하세요:

```markdown
## 새로운 규칙

- **규칙명**: 규칙 설명
- **체크 항목**: 확인할 내용
- **심각도**: CRITICAL/HIGH/MEDIUM/LOW
```

### 리뷰 템플릿 수정

`scripts/review-template.md` 파일을 편집하여 리뷰 지시사항을 수정할 수 있습니다.

## 🤝 팀 협업

### 규칙 업데이트

1. 팀 회의에서 새로운 규칙 논의
2. `.cursorrules` 파일 업데이트
3. 팀원들에게 변경사항 공유
4. 테스트 커밋으로 검증

### 규칙 관리

- 정기적인 규칙 리뷰 (월 1회)
- 새로운 기술 스택 도입 시 규칙 업데이트
- 팀 피드백 반영

## 📚 추가 자료

- [Cursor 공식 문서](https://cursor.sh/docs)
- [Husky 문서](https://typicode.github.io/husky/)
- [lint-staged 문서](https://github.com/okonet/lint-staged)

## 🆘 지원

문제가 발생하면 다음을 확인해주세요:

1. 이 README의 문제 해결 섹션
2. 팀 슬랙 채널
3. 프로젝트 이슈 트래커

---

**Happy Coding! 🚀**
