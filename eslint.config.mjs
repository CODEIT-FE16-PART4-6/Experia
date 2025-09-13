// eslint.config.mjs에 규칙 추가
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier: prettier,
      import: importPlugin,
    },
    rules: {
      // 기본 ESLint 규칙 - 핵심만 유지
      'no-unused-vars': 'off', // JS용 기본 비활성화
      'no-console': 'off', // console.log 허용 (개발 편의성)
      'no-debugger': 'error', // debugger 사용 금지
      'prefer-const': 'warn', // let 대신 const 권장 (강제 아님)
      'no-var': 'error', // var 사용 금지

      // TypeScript 규칙 - 엄격하게 설정
      '@typescript-eslint/no-unused-vars': [
        'error', // 에러로 변경하여 빌드 실패하도록
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error', // any 타입 사용 금지
      '@typescript-eslint/prefer-optional-chain': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off', // non-null assertion 허용

      // Import/Export 규칙 - 핵심만 유지
      'import/order': 'off', // import 순서 규칙 비활성화
      'import/no-unresolved': 'error', // 해결되지 않는 import는 여전히 에러
      'import/no-duplicates': 'error', // 중복 import 금지 (빌드 문제 방지)
      'import/no-relative-packages': 'error', // 상대 경로로 패키지 import 금지

      // 절대 경로 사용 강제 규칙 - 실제 상대 경로만 금지
      'import/no-relative-parent-imports': 'off', // 절대 경로와 혼동되어 비활성화

      // 커스텀 규칙: 부모 디렉토리로의 상대 경로만 차단
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*'],
              message:
                '부모 디렉토리로의 상대 경로(../) 사용을 금지합니다. 절대 경로(@/)를 사용하세요.',
            },
          ],
        },
      ],

      // Prettier 통합 - 일관성을 위해 활성화
      'prettier/prettier': 'error', // Prettier 규칙 활성화하여 포맷팅 통일

      // React 규칙 - 완화
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/exhaustive-deps': 'off', // useEffect 의존성 배열 경고 해제
    },
  },
];

export default eslintConfig;
