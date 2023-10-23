import path from 'path';

module.exports = {
	entry: path.resolve(__dirname, 'src/index.tsx'),
	devtool: false,
	output: {
		path: path.resolve(__dirname, '/dist'),
		filename: '[name]_bundle.js',
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './'),
		},
		extensions: ['.tsx', '.json', '.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'ts-loader'],
			},
			// First Rule
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},

			// Second Rule
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localsConvention: 'camelCase',
							sourceMap: true,
						},
					},
				],
			},
		],
	},
};
