const webpack =  require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');


const config = {
    devtool: 'eval',
    entry: [
        'webpack/hot/only-dev-server',
        'tether',
        'font-awesome/scss/font-awesome.scss',
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"), // Relative directory for base of server-- location of the bundle
        publicPath: '/',
        inline: true,
        port: process.env.PORT || 3000, // Port Number
        host: '127.0.0.1', // Change to '0.0.0.0' for external facing server
        historyApiFallback: true,
    },
    plugins: [
        // new webpack.optimize.ModuleConcatenationPlugin(),
        // minify the bundle
        // new HtmlWebpackPlugin({
        //     template: path.join(__dirname, 'index.js'),
        //     path: buildPath,
        //     excludeChunks: ['base'],
        //     filename: 'index.html',
        //     minify: {
        //         collapseWhitespace: true,
        //         collapseInlineTagWhitespace: true,
        //         removeComments: true,
        //         removeRedundantAttributes: true
        //     }
        // }),
        new webpack.HotModuleReplacementPlugin(),

        new webpack.ProvidePlugin({

                  $: 'jquery',
                  jQuery: 'jquery',
                  'window.jQuery': 'jquery',
                  tether: 'tether',
                  Tether: 'tether',
                  'window.Tether': 'tether',
                  Popper: ['popper.js', 'default'],
                  'window.Tether': 'tether',
                  Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
                  Button: 'exports-loader?Button!bootstrap/js/dist/button',
                  Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
                  Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
                  Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
                  Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
                  Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
                  Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
                  Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
                  Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
                  Util: 'exports-loader?Util!bootstrap/js/dist/util'

        }),
        new ExtractTextPlugin('./src/main.css'),
        new TransferWebpackPlugin([
            {
                from: 'src',
            }
        ])
     ],

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'react-hot-loader/webpack',
                    'babel-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    // 'eslint-loader'
                ]
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader',
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?name=images/[name].[ext]',
                    'image-webpack-loader?bypassOnDebug'
                ]
            },
            {
                test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(scss)$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins() {
                                    //exports to postcs.config.js
                                    return [
                                            precss,
                                            autoprefixer
                                    ];

                                }
                            }
                        },
                        {
                            loader: 'sass-loader' //compiles SASS to css
                        }
                    ]
                }
            ))
            },
            {
                test: /bootstrap\/dist\/js\/umd\//,
                use: 'imports-loader?jQuery=jquery'
            },
            {
                test: /font-awesome\.config\.js/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'font-awesome-loader'
                    }
                ]
            },
            {
                test: /bootstrap\/dist\/js\/umd\//,
                use: 'imports-loader?jQuery=jquery'
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css', '.scss'],
    }
}

module.exports = config;