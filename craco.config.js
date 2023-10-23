// craco.config.js
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
	webpack: {
		configure: (webpackConfig, { env, paths }) => {
			paths.appBuild = webpackConfig.output.path = path.resolve('dist');
			return webpackConfig;
		},
	},
	plugins: [
		{
			plugin: {
				overrideWebpackConfig: ({ webpackConfig }) => {
					webpackConfig.resolve.plugins.push(new TsconfigPathsPlugin({}));
					return webpackConfig;
				},
			},
		},
	],
};
