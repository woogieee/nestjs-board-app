module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': [
      //코드작성 규칙
      'error', {
        singleQuote: true,
        //문자열을 사용할때 '(홑따옴표) 사용
        seme: true,
        //코드는 ;(세미콜론)으로 끝나야 함
        useTabs: false,
        //tab 대신에 스페이스를 사용
        tabWidth: 2,
        //들여쓰기는 2칸(space 2칸)
        endOfLine: 'auto',
        //띄어쓰기 경고 Delete`cr`해결
        trailingComma: 'none',
        //여러줄을 사용할때 후행 콤마 사용방식
        // printWidth: 80
        // //한줄에 글자수 80개
      }
    ]
  },
};
