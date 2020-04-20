const path = require('path')

// 导入处理html插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 导入css分离插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 创建一个分离css实例
var miniCssExtractPlugin = new MiniCssExtractPlugin({
    // 输出名称
    filename: '[name][hash].css'
})

// 创建处理html模板实例
var htmlWebpackPlugin = new HtmlWebpackPlugin({
    // 模板路径
    template: './app.html',
    // 打包脚本注入方式
    // true表明将打包输出的脚本添加到body结束标签之前
    // false 表明不添加脚本  基本不用
    // head表明将输出的脚本添加到head标签结束之前
    // body 跟true一样  表明将打包输出的脚本添加到body结束标签之前
    inject: true,

    // 压缩配置
    minify: {
        // 去除注释
        // true去除注释
        removeComments: true,

        // 移除标签属性的双引号
        removeAttributeQuotes: true,

        // 去除空白符
        collapseWhitespace: true,
    },

    // 输出文件名
    filename: 'app.html'
})


module.exports = {
    // 模式
    mode: 'development',

    // 入口
    entry: {
        app: ['./app/app.js']
    },

    // 出口
    output: {
        // 输出路径
        path: path.resolve(__dirname, 'assets'),
        // 输出文件名称
        filename: '[name].js'

    },


    // 模块
    module: {

        // 定义loader解析规则
        rules: [
            // css-loader
            {
                // 匹配文件后缀
                test: /\.css$/,

                // 使用loader
                use: [
                    // { loader: 'style-loader' },
                    // 分离css
                    { loader: MiniCssExtractPlugin.loader },

                    { loader: 'css-loader' }
                ]
            },

            // less-loader
            {
                // 匹配文件后缀
                test: /\.less$/,
                use: [
                    // { loader: 'style-loader' },
                    // 分离less
                    { loader: MiniCssExtractPlugin.loader },

                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
                ]
            },

            // url-loader
            {
                test: /\.(png|gif|jpg|jpeg|webp)$/,
                use: [
                    {
                        loader: 'url-loader',
                        // 指定图片转base64码的范围，单位为B
                        options: {
                            limit: 10240,
                            // 处理图片时，不返回对象结构
                            esModule: false,
                        }
                    },
                ]
            },

            // html-withimg-loader
            {
                test: /\.html?$/,
                use: [
                    { loader: 'html-withimg-loader' },
                ]
            },
        ]
    },

    // 插件
    plugins: [
        // 分离css插件
        miniCssExtractPlugin,
        // 处理html 模板
        htmlWebpackPlugin,
    ],

    devServer: {
        host: 'localhost',
        port: 8001,
        before(app) {
            // 路由实例
            app.get('/pros', (req, res) => {
                // req请求对象
                // res响应对象
                res.json({name:'webpack本地服务器',status:'ok'})
                // res.send('success')
            })
        }
    }




}
