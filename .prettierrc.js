module.exports = {
  printWidth: 800, // 一行的字符数，如果超过会进行换行
  tabWidth: 2, // 一个tab代表几个空格数，默认就是2
  tabSize: 2,
  useTabs: false, // 是否启用tab取代空格符缩进，.editorconfig设置空格缩进，所以设置为false
  semi: false, // 行尾是否使用分号，默认为true
  singleQuote: true, // 字符串是否使用单引号
  trailingComma: 'none', // 对象或数组末尾是否添加逗号 none| es5| all
  jsxSingleQuote: false, // 在jsx里是否使用单引号
  jsxBracketSameLine: true, //多属性html标签的‘>’折行放置
  bracketSpacing: true, // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  arrowParens: 'always', // 箭头函数如果只有一个参数则省略括号<avoid|always>
  spaceBeforeFunctionParen: true, // 删除 function 关键字及其括号之间的空格
  requirePragma: false, //无需顶部注释即可格式化
  insertPragma: false, //在已被prettier格式化的文件顶部加上标注
  proseWrap: 'preserve', // 按照文件原样折行
  htmlWhitespaceSensitivity: 'ignore', //对HTML全局空白不敏感
  endOfLine: 'lf', //结束行形式
  embeddedLanguageFormatting: 'auto', //对引用代码进行格式化
}
