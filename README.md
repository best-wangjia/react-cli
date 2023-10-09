### 其他未使用插件

stylelint-webpack-plugin：该插件使用 stylelint 帮助你在样式代码中避免错误并强制规范。

@pmmmwh/react-refresh-webpack-plugin：一个实验性的Webpack插件，可用于启用“快速刷新”（也称为热重新加载），以供React组件。

postcss-pxtorem：移动端px适配rem插件

postcss-px-to-viewport：：移动端px适配viewport units插件

## Git规范校验约束

# commitlint 校验提交信息，commitizen 辅助填写提交信息

husky：可以用于实现各种 git Hook。这里主要用到 pre-commit 这个 hook，在执行 commit 之前，运行一些自定义操作

lint-staged：用于对 git 暂存区中的文件执行代码检测

@commitlint/cli：可以检查提交信息

@commitlint/config-conventional：是提交规范的配置包

@commitlint/cz-commitlint与commitlint-config-cz二选一

@commitlint/cz-commitlint 适合使用已有规范，或基于已有规范进行自定义扩展的情况。

commitlint-config-cz 适合不依赖已有规范完全自定义的场景。

## ESLint规范校验约束


