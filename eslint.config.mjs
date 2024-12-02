import eslint from '@eslint/js'

import globals from 'globals'

import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
// import pluginPrettier from 'eslint-plugin-prettier'
// import configPrettier from 'eslint-config-prettier'

import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

import babelParser from '@babel/eslint-parser'

import tsESLint from 'typescript-eslint'
import tsESLintPlugin from '@typescript-eslint/eslint-plugin'
import tsESLintParser from '@typescript-eslint/parser'

const customTSFlatConfig = [
  {
    name: 'typescript-eslint/base',
    languageOptions: {
      parser: tsESLintParser,
      sourceType: 'module',
    },
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...tsESLintPlugin.configs.recommended.rules,
      // '@typescript-eslint/ban-types': 2,
      '@typescript-eslint/no-confusing-non-null-assertion': 2,
    },
    plugins: {
      '@typescript-eslint': tsESLintPlugin,
    },
  },
]

const flatConfig = [
  {
    name: 'global config',
    languageOptions: {
      globals: {
        ...globals.es2022,
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    rules: {
      'no-dupe-class-members': 0,
      'no-redeclare': 0,
      'no-undef': 0,
      'no-unused-vars': 0,
    },
  },
  {
    name: 'react-eslint',
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    languageOptions: {
      ...reactPlugin.configs.recommended.languageOptions,
      // parserOptions: {
      //   ecmaFeatures: {
      //     jsx: true,
      //   },
      // }
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 0,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    name: 'babel-parser',
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        babelOptions: {
          babelrc: false,
          configFile: false,
          browserslistConfigFile: false,
          presets: ['@babel/preset-env'],
        },
        requireConfigFile: false,
      },
    },
  },
  {
    ignores: [
      'dist',
      'node_modules',
      'public',
      'build',
      'coverage',
      'analysis',
      '.DS_Store',
      'src/utils',
      'src/typings',
    ],
  },
]

// export default tsEslint.config(
//   eslint.configs.recommended,
//   eslintPluginPrettierRecommended,
//   ...flatConfig,
//   ...tsEslint.configs.recommended,
// );

export default [
  eslint.configs.recommended,
  pluginPrettierRecommended,
  ...flatConfig,
  ...customTSFlatConfig,
]
