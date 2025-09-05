const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Next.js 프로젝트의 루트 디렉터리를 Next.js에게 알려주기 위한 경로
  dir: './',
});

// Jest에 추가적인 설정을 적용하려면 아래와 같이 export를 수정하세요.
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
};

// Next.js Jest 설정을 비동기적으로 내보냅니다.
module.exports = createJestConfig(customJestConfig);
