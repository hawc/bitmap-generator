module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended',
    ],
    // add your custom rules here
    rules: {
        'no-fallthrough': ["error", { "commentPattern": "break[\\s\\w]*omitted" }],
        'space-before-function-paren': ['error', 'never'],
        'arrow-parens': ['error', 'as-needed'],
        'semi': ['error', 'always'],
        'quotes': ['error', 'single'],
        'indent': 'off',
        'comma-dangle': ['error', 'always-multiline'],
        'template-curly-spacing': ["error", "always"],
        'vue/html-indent': ['error', 4],
        'vue/script-indent': 'off',
        'vue/max-attributes-per-line': ['error', {
            'singleline': 1,
            'multiline': {
                'max': 1,
                'allowFirstLine': true,
            }
        }],
        'vue/html-closing-bracket-newline': ['error', {
            'singleline': 'never',
            'multiline': 'never',
        }],
    },
}
