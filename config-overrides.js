const {
	override,
	overrideDevServer,
	fixBabelImports,
	addWebpackAlias,
	addWebpackPlugin,
	addDecoratorsLegacy
} = require('customize-cra')
const path = require('path')
const paths = require('react-scripts/config/paths')
const rewireLess = require('react-app-rewire-less-modules')
const webpackBuildNotifier = require('webpack-build-notifier')

function resolve(dir) {
	return path.resolve(__dirname, '..', dir)
}

const rewiredMap = () => config => {
	config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false
	return config
}

const addBuildPathFile = () => config => {
	if (process.env.NODE_ENV === 'development') {
		console.log('ENV is development')
	} else if (process.env.NODE_ENV === 'production') {
		console.log('ENV is production')
		config.devtool = false
		paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist')
		config.output.path = path.join(path.dirname(config.output.path), 'dist')
	}
	return config
}

const dropConsole = () => config => {
	if (config.optimization.minimizer) {
		config.optimization.minimizer.forEach(minimizer => {
			if (minimizer.constructor.name === 'TerserPlugin') {
				minimizer.options.terserOptions.compress.drop_console = true
			}
		})
	}
	return config
}

const devServerConfig = () => config => {
	return {
		...config,
		compress: true,
		proxy: {
			'/api': {
				target: '',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}

module.exports = {
	wepback: override(
		addDecoratorsLegacy(),
		addWebpackAlias({
			['src']: resolve('src/')
		}),
		fixBabelImports('import', {
			libraryName: 'antd',
			libraryDirectory: 'es',
			style: 'css'
		}),
		addBuildPathFile(),
		dropConsole(),
		rewiredMap(),
		addWebpackPlugin(
			new webpackBuildNotifier({
				title: 'Build Complete!',
				logo: resolve('public/favicon.ico'),
				suppressSuccess: true
			})
		),
		(config) => {
			config = rewireLess(config)
			config = rewireLess.withLoaderOptions({
				modifyVars: {
					'primary-color': '#00a682'
				}
			})(config)
			return config
		}
	),
	devServer: overrideDevServer(devServerConfig())
}
