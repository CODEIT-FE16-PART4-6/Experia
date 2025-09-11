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
      'no-unused-vars': 'off', // JS용 기본 비활성화
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error', // any 타입 사용 금지
      'import/order': [
        'warn', // 경고로 설정
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
        },
      ],
    },
  },
];

export default eslintConfig;
