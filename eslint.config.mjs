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
      // 기본 ESLint 규칙
      'no-unused-vars': 'off', // JS용 기본 비활성화
      'no-console': 'warn', // console.log 사용시 경고
      'no-debugger': 'error', // debugger 사용 금지
      'prefer-const': 'error', // let 대신 const 사용 강제
      'no-var': 'error', // var 사용 금지

      // TypeScript 규칙
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error', // any 타입 사용 금지
      '@typescript-eslint/prefer-optional-chain': 'off', // 타입 정보 필요
      '@typescript-eslint/prefer-nullish-coalescing': 'off', // 타입 정보 필요
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // Import/Export 규칙
      'import/order': [
        'error', // 경고를 에러로 변경
        {
          groups: [
            'builtin', // 내장 모듈 (path, fs 등)
            'external', // 외부 라이브러리 (react, lodash 등)
            'internal', // tsconfig path로 매핑된 절대 경로 (src/components 등)
            'parent', // 부모 디렉토리 모듈
            'sibling', // 같은 디렉토리 모듈
            'index', // 인덱스 모듈 (index.js)
            'unknown', // 알 수 없는 모듈
          ],
          alphabetize: {
            order: 'asc', // 알파벳 순서로 정렬
          },
          'newlines-between': 'always', // 그룹 간 빈 줄 강제
        },
      ],
      'import/no-unresolved': 'error', // 해결되지 않는 import 에러
      'import/no-duplicates': 'error', // 중복 import 금지

      // Prettier 통합
      'prettier/prettier': 'error', // Prettier 규칙 위반시 에러

      // React 규칙
      'react/jsx-uses-react': 'off', // React 17+ 에서 불필요
      'react/react-in-jsx-scope': 'off', // React 17+ 에서 불필요
      'react/prop-types': 'off', // TypeScript 사용시 불필요
      'react-hooks/exhaustive-deps': 'warn', // useEffect 의존성 배열 경고
    },
  },
];

export default eslintConfig;
