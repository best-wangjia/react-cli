module.exports = {
  // 继承的规则
  extends: ['@commitlint/config-conventional'],
  // 定义规则类型
  rules: {
    // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
    'type-enum': [
      2,
      'always',
      [
        'feat', // 增加新功能
        'fix', // 修复问题/BUG
        'style', // 代码风格相关无影响运行结果的
        'perf', // 优化/性能提升
        'refactor', // 重构(既不是增加feature，也不是修复bug)
        'revert', // 撤销修改
        'test', // 测试相关
        'docs', // 文档/注释
        'chore', // 依赖更新/脚手架配置修改等
        'ci', // 持续集成
        'types', // 类型定义文件更改
        'wip' // 开发中
      ]
    ], // subject 大小写不做校验
    'subject-case': [0]
  }
}
