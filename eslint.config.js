import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: { js },
    extends: ['plugin:jsx-a11y/recommended'],
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'warn',
      'no-constant-condition': 'warn',

      // 추가된 jsx-a11y 규칙
      'jsx-a11y/anchor-is-valid': [
        'warn',
        {
          components: ['Link'],
          specialLink: ['to'],
          aspects: ['noHref', 'invalidHref', 'preferButton']
        }
      ],
      'jsx-a11y/alt-text': 'error', // 모든 이미지에 alt 속성 필수
      'jsx-a11y/no-autofocus': 'warn', // autofocus 사용 경고
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          labelComponents: [],
          labelAttributes: ['label'],
          controlComponents: ['Input'],
          depth: 3
        }
      ]
    }
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser }
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended
]);
