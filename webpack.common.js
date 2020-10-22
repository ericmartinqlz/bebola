const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
 
module.exports = {
    entry: {
        third: './src/third.js',
        index: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name].[ext]",
                            outputPath: "assets/images",
                        },
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name].[ext]",
                            outputPath: "assets/webfonts",
                        },
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new CopyPlugin({
            patterns: [
                {
                    from:'./src/*.json',
                    to:'',
                    flatten:true
                },
                {
                    from:'./src/serviceWorker.js',
                    to:'',
                    flatten:true
                },
                {
                    from:'./src/assets/pages/*.html',
                    to:'assets/pages',
                    flatten:true
                },
                {
                    from:'./src/assets/appShell/*.html',
                    to:'assets/appShell',
                    flatten:true
                },
                {
                    from:'./src/*.png',
                    to:'',
                    flatten:true
                }
            ],
        })
    ]
}