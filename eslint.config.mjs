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

      // TypeScript 규칙 - 핵심만
      '@typescript-eslint/no-unused-vars': [
        'warn', // 경고로 완화
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn', // any 타입 경고 (금지 아님)
      '@typescript-eslint/prefer-optional-chain': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off', // non-null assertion 허용

      // Import/Export 규칙 - 머지 충돌 방지를 위해 완전 제거
      'import/order': 'off', // import 순서 규칙 완전 제거
      'import/no-unresolved': 'error', // 해결되지 않는 import는 여전히 에러
      'import/no-duplicates': 'off', // 중복 import도 허용 (머지 충돌 방지)

      // Prettier 통합 - 머지 충돌 방지를 위해 완화
      'prettier/prettier': 'off', // Prettier 규칙 완전 제거 (머지 충돌 방지)

      // React 규칙 - 완화
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/exhaustive-deps': 'off', // useEffect 의존성 배열 경고 해제
    },
  },
];

export default eslintConfig;
