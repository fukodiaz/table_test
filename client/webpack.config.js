let path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const conf = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname,'dist'),
		filename: 'main.js',
	},

	devServer: {
		static: {
			directory: path.join(__dirname)
		},
		historyApiFallback: true,
		port: 8080,
		proxy: {
			"*": {
				target: "http://localhost:3000",
				secure: false, 
				changeOrigin: true,
			}
		},
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: '/node_modules/',
				loader: 'babel-loader'
			},
			{
				test: /\.m\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[local]__[sha1:hash:hex:7]'
							}
						}
					}
				]
			},
			{
				test: /^((?!\.m).)*css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},

			{
				test: /\.m\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							modules: {
								localIdentName: '[local]__[sha1:hash:hex:7]'
							}
						}
					},
					'postcss-loader',
					'less-loader'
				]
			},
			{
				test: /^((?!\.m).)*less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2
						}
					},
					'postcss-loader',
					'less-loader'
				]
			},

			{
				test: /\.(png|jpg|jpeg|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'images',
							name: '[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(ttf|woff)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'fonts',
							name: '[name].[ext]'
						}
					}
				]
			}
		]
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: 'main.css'
		})
	]
};

module.exports = (env, options) => {
	let isProd = options.mode === 'production';
	conf.devtool = isProd ? false : 'eval-cheap-module-source-map';

	return conf;
};