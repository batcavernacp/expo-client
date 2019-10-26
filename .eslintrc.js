const requireText = require('require-text')
const schemaString = requireText('./graphql/schema.graphql', require)

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-native', 'graphql'],
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:promise/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 6,
    project: "./tsconfig.json",
    sourceType: "module"
  },
  rules: {
    'graphql/template-strings': [
      'error',
      {
        env: 'relay',
        schemaString,
        tagName: 'graphql'
      }
    ],
    'no-implicit-dependencies': 0,
    'no-submodule-imports': 0,
    'ordered-imports': 0,
    'object-literal-sort-keys': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'import/named': 0,
    'react/prop-types': 0,
    'import/no-unresolved': 0
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
