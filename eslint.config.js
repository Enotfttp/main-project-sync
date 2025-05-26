import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint';
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-plugin-prettier';


export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
        ],
        files: ['**/*.{ts,tsx}'],
        linterOptions:{
            reportUnusedDisableDirectives: true
        },
        languageOptions: {
            ecmaVersion: "latest",
            globals: globals.browser,
        },
        settings:{
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json'
                }
            }
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            import: importPlugin,
            'prettier':prettierConfig
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'import/no-unresolved': 'error',
            "no-multi-spaces": 'error',
            "no-console":'warn',
            "prettier/prettier": 'error',
            // отступы
            // кавычки
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            // React
            'react/react-in-jsx-scope': 'off', // не нужен в React 17+
            'react/prop-types': 'off', // используем TypeScript
            // хуки
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'off',
            // импорты
            'import/order': 'warn',
            // 'simple-import-sort/imports': 'error',
            // 'simple-import-sort/exports': 'error',
            'import/newline-after-import': ['error', { count: 1 }],
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
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
