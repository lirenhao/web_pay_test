/**
 * Author：Yky
 * Create Date：2016/9/7
 * Modified By：Yky
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
var path = require(`path`);
var webpack = require(`webpack`);
var OpenBrowserPlugin = require(`webpack`);
var HtmlWebpackPlugin = require(`html-webpack-plugin`);

module.exports = {
	entry: {
		bundle: ['bootstrap-loader', './src/client.js']
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js'
	},
	module: {
		loaders: [
			{test: /\.js?$/, loader: "babel", include: path.resolve(__dirname, './src')},
			{test: /\.css$/, loader: "style!css"},
			{test: /\.s[a,c]ss$/, loader: "style!css!sass"},
			{
				test: /\.(woff|woff2)(\?v=\d\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=application/font-woff"
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=application/octet-stream"
			},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=image/svg+xml"
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "测试页",
		}),
		// 	new OpenBrowserPlugin({
		// 		url: "http://localhost:8080"
		// 	}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		})
	]
};