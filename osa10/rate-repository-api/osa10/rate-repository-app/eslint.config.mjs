import pluginReact from 'eslint-plugin-react';
import pluginReactNative from 'eslint-plugin-react-native';
import babelParser from '@babel/eslint-parser';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';

export default [
  reactRecommended,
  {
    plugins: {
      react: pluginReact,
      'react-native': pluginReactNative,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        __DEV__: 'readonly',
        fetch: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
