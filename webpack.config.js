const webpack =  require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require('extract-text-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');


cosnt config = {
    devtool: 'eval'
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
    plugins: [
        new webpack.HotModuleReplacementPlugin()
        new ExtractTextPlugin('./src/main.css'),
        new TransferWebpackPlugin([
                {
                    from: 'src',
                }
            ])
         ],
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

    module: {
        rules: [
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
                use: ExtractTextPlugin.extract({
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
                })
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
            }
        ]
    }
}

module.exports = config;