module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'plugins': ['import'],
  'settings': {
    'import/resolver':{
      'node': {
        'extensions':['.js', '.mjs'],
      },
    },
  },
  'overrides': [
    {
      'env': {
        'node': true,
        'es6': true,
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-console' : 0
  }
}
