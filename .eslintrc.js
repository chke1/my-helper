module.exports = {
  // 当前配置为根配置，将不再从上级文件夹查找配置
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/base',
    'plugin:json/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: 'vue-eslint-parser', // 解决jsx提示错误
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  plugins: ['vue'],
  rules: {
    // 在rules中添加自定义规则
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/multi-word-component-names': 0, // 关闭组件命名规则
    'no-unused-vars': 0, // 不能有声明后未被使用的变量或参数
    'no-empty': 1, // 块语句中的内容不能为空
    'no-extra-boolean-cast': 0, // 禁止不必要的bool转换
    'vue/max-attributes-per-line': ['off'], // 每行最大属性数关闭
    'no-useless-escape': 0, // 正则标志
    'no-async-promise-executor': 0, // Promise不建议使用async
    'no-constant-condition': 1, // 禁止在条件中使用常量表达式 if(true) if(1)
    'no-unneeded-ternary': 1, // 禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
  },
};
