const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://sp-globalnomad-api.vercel.app';
const TEAM = process.env.NEXT_PUBLIC_TEAM || '16-6';

// 환경변수 체크 (개발 환경에서는 경고만)
if (!process.env.NEXT_PUBLIC_BACKEND_URL || !process.env.NEXT_PUBLIC_TEAM) {
  console.warn(
    `환경변수가 설정되지 않아 기본값을 사용합니다. BACKEND_URL: ${BACKEND_URL}, TEAM: ${TEAM}`,
  );
}

export const REQUEST_URL = `${BACKEND_URL}/${TEAM}`;
