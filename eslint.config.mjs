import antfu from '@antfu/eslint-config'

export default antfu({
  solid: true,
  typescript: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: true,
  },
  rules: {
    'no-console': 'warn',
    'ts/no-unused-expressions': 'off',
    'ts/no-empty-object-type': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unicorn/consistent-function-scoping': 'off',
    'solid/reactivity': ['warn', {
      // List of function names to consider as reactive functions (allow signals to be safely passed as arguments). In addition, any create* or use* functions are automatically included.
      customReactiveFunctions: ['watch'], // Array<string>
    }],
  },
}, { ignores: ['**/*.d.ts'] })
