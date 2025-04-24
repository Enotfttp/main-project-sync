import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint';
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import';



export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
      linterOptions:{
       reportUnusedDisableDirectives: true
      },
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
    },
      settings:{
        'import/resolver': {
            typescript: {
                project: './tsconfig.json'
            }
        }
      },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
       import: importPlugin,    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'import/no-unresolved': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
        'indent': [
            'error', 2, {
                "SwitchCase": 1,        // отступ для case в switch
                "VariableDeclarator": "first", // выравнивание объявлений переменных
                "outerIIFEBody": 1,
                "MemberExpression": 1,
                "FunctionDeclaration": {
                    "parameters": "first",      // выравнивание параметров функции
                    "body": 1
                },
                "FunctionExpression": {
                    "parameters": "first",
                    "body": 1
                },
                "CallExpression": {
                    "arguments": "first"
                },
                "ArrayExpression": 1,
                "ObjectExpression": 1,
                "ImportDeclaration": 1,
                "flatTernaryExpressions": false,
                "ignoreComments": false
            }
        ],
    },
  },
)


