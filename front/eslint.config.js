import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import importPlugin from 'eslint-plugin-import'


export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
      'import': importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react/prop-types': 'off',
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'react/jsx-uses-vars': 'error',
      'no-console': 'warn',
      'import/newline-after-import': 'error',
      'react/no-children-prop': 'off',
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'jsx-quotes': ['error', 'prefer-single'],
      'semi': ['error', 'never'],
      'no-duplicate-imports': 'error',
      'no-empty-pattern': 'warn',
      'default-case': 'warn',
      'array-bracket-spacing': 'warn',
      'computed-property-spacing': 'warn',
      'eol-last': ['error', 'always'],
      'max-len': ['error', { 'code': 200 }],
      'no-debugger': 'warn',
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-indent': [2, 2],
      'react/jsx-indent-props': [2, 2],
      'object-curly-spacing': ['error', 'always'],
      'space-before-blocks': 'warn',
      'no-unescaped-entities': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
