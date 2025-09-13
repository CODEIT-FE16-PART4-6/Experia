# OpenAI 리뷰 설정 가이드

## 🚀 OpenAI 리뷰 사용하기

OpenAI 리뷰는 **Cursor 없이도** 모든 팀원이 사용할 수 있습니다!

## 📋 설정 방법

### 1. OpenAI API 키 발급

1. [OpenAI 웹사이트](https://platform.openai.com/) 접속
2. 계정 생성 및 로그인
3. API Keys 메뉴에서 새 키 생성
4. 키 복사 (한 번만 표시됨!)

### 2. 로컬 환경 변수 설정

#### **Windows (PowerShell)**

```powershell
# 현재 세션에만 적용
$env:OPENAI_API_KEY="your_api_key_here"

# 영구 설정
[Environment]::SetEnvironmentVariable("OPENAI_API_KEY", "your_api_key_here", "User")
```

#### **Windows (CMD)**

```cmd
set OPENAI_API_KEY=your_api_key_here
```

#### **macOS/Linux (Bash/Zsh)**

```bash
# 현재 세션에만 적용
export OPENAI_API_KEY="your_api_key_here"

# 영구 설정 (~/.bashrc 또는 ~/.zshrc에 추가)
echo 'export OPENAI_API_KEY="your_api_key_here"' >> ~/.bashrc
source ~/.bashrc
```

#### **.env 파일 사용 (권장)**

```bash
# 프로젝트 루트에 .env 파일 생성
echo 'OPENAI_API_KEY=your_api_key_here' > .env
echo 'OPENAI_MODEL=gpt-4' >> .env
```

### 3. 사용 방법

#### **커밋 시 AI 리뷰 실행**

```bash
# AI 리뷰와 함께 커밋
npm run commit:ai:openai

# 또는 환경 변수로
OPENAI_REVIEW=true git commit -m "새 기능 추가"
```

#### **직접 AI 리뷰 실행**

```bash
# 특정 파일 리뷰
node scripts/ai-review-openai.js

# Git 변경사항 리뷰
node scripts/ai-review-openai.js
```

## 🔍 작동 방식

### **API 키가 있는 경우**

- OpenAI GPT-4를 사용한 고급 코드 리뷰
- 팀 규칙에 따른 상세한 피드백
- 개선 제안 및 베스트 프랙티스 추천

### **API 키가 없는 경우**

- 규칙 기반 리뷰로 자동 전환
- 기본적인 코드 품질 검사
- 팀 코딩 규칙 준수 확인

## 💡 팁

### **비용 절약**

- API 키 없이도 기본 리뷰는 작동
- 필요할 때만 OpenAI API 사용
- `OPENAI_MODEL=gpt-3.5-turbo`로 모델 변경 가능

### **보안**

- API 키는 절대 Git에 커밋하지 마세요
- `.env` 파일은 `.gitignore`에 포함됨
- 팀원별로 개별 API 키 사용 권장

## 🚨 문제 해결

### **API 키 오류**

```bash
# 환경 변수 확인
echo $OPENAI_API_KEY  # macOS/Linux
echo %OPENAI_API_KEY% # Windows
```

### **권한 오류**

```bash
# 스크립트 실행 권한 부여
chmod +x scripts/ai-review-openai.js
```

### **Node.js 오류**

```bash
# Node.js 버전 확인 (18+ 필요)
node --version
```

## 📞 도움이 필요하면

1. 팀 채널에서 질문
2. 이 가이드 다시 확인
3. `npm run fix:hooks` 실행 후 재시도
