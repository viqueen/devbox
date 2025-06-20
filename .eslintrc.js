/**
 * Copyright 2025 Hasnae Rehioui
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            modules: true
        }
    },
    plugins: ['import', '@labset-eslint'],
    extends: ['eslint:recommended', 'plugin:import/recommended'],
    env: {
        browser: true,
        node: true,
        es6: true
    },
    rules: {
        '@labset-eslint/license-notice': [
            'error',
            {
                license: 'Apache-2.0',
                copyRightYear: '2025',
                copyRightName: 'Hasnae Rehioui'
            }
        ],
        'import/order': [
            'error',
            {
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                },
                pathGroupsExcludedImportTypes: ['builtin']
            }
        ]
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts', '.tsx']
            }
        }
    }
};
