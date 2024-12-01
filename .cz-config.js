module.exports = {
  // 可选类型，和上面commitlint.config.js配置的规则一一对应
  types: [
    { value: 'feat', name: 'feat: 增加新功能' },
    { value: 'fix', name: 'fix: 修复问题/BUG' },
    { value: 'style', name: 'style: 代码风格相关无影响运行结果的' },
    { value: 'perf', name: 'perf: 优化/性能提升' },
    { value: 'refactor', name: 'refactor: 重构(既不是增加feature，也不是修复bug)' },
    { value: 'revert', name: 'revert: 撤销修改' },
    { value: 'test', name: 'test: 测试相关' },
    { value: 'docs', name: 'docs: 文档/注释' },
    { value: 'chore', name: 'chore: 依赖更新/脚手架配置修改等' },
    { value: 'ci', name: 'ci: 持续集成' },
    { value: 'types', name: 'types: 类型定义文件更改' },
    { value: 'wip', name: 'wip: 开发中' }
  ], // 消息步骤，正常只需要选择
  messages: {
    type: '请选择提交类型:', // customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):', // body: '请输入详细描述(可选):',
    footer: '请输入要关闭的issue(可选):',
    confirmCommit: '确认使用以上信息提交？(y/n)'
  }, // 跳过问题：修改范围，自定义修改范围，详细描述，issue相关
  skipQuestions: ['scope', 'customScope', 'body', 'footer'], // subject描述文字长度最长是72
  subjectLimit: 100
}
