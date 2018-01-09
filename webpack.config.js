const webpack = require('webpack')
const path = require('path')

const config = {
    context: path.resolve(__dirname, 'src'),
    devtool: 'eval-source-map',
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['es2015', { modules: false }]
                        ]
                    }
                }]
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg)$/,
                use: [{
                    loader: "file-loader?name=src/images/[name].[ext]"
                }]
            }

        ]
    }
}

module.exports = config