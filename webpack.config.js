/**
 * Author：Yky
 * Create Date：2016/9/7
 * Modified By：liRenhao
 * Why & What is modified 添加hmr插件
 * Modified By：liRenhao
 * Why & What is modified react-hot-loader版本从3.0.0-beta.3回退到1.3.0
 * Modified By：liRenhao
 * Why & What is modified react-hot-loader1.3.0不支持redux-form v6.0重新换回到3.0.0-beta.3版
 *  * Modified By：liRenhao
 * Why & What is modified 添加环境参数
 * webpack的配置文件,搭建webpack的环境
 */
var path = require("path")
var webpack = require("webpack")
var OpenBrowserPlugin = require("open-browser-webpack-plugin")
var HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
	entry: {
		bundle: [
			"react-hot-loader/patch",
			"bootstrap-loader",
			"./src/client.js"]
	},
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "[name].js"
	},
	module: {
		loaders: [
			{test: /\.js?$/, loader: "babel", include: path.resolve(__dirname, "./src")},
			{
				test: /\.css$/,
				loader: "style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
			},
			{
				test: /\.s[a,c]ss$/,
				loader: "style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass"
			},
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
	devServer: {
		contentBase: "./build",
		historyApiFallback: true
	},
	plugins: [
		// Define free variables
		new webpack.DefinePlugin({
			"process.env.wsUrl": "'ws://60.205.93.81:9000/ws'",
		}),
		new HtmlWebpackPlugin({
			title: "测试页",
		}),
		new OpenBrowserPlugin({
			url: "http://localhost:8080"
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		})
	]

}