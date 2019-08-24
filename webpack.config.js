import pkg from './package.json';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import { CleanWebpackPlugin as CleanPlugin } from 'clean-webpack-plugin';
import Html5Plugin from 'html5-webpack-plugin';
import OpenBrowserPlugin from 'open-browser-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import NotifierPlugin from 'webpack-notifier';

const { SSL_CERT, SSL_CA, SSL_KEY, HTML, JS, FAVICON, SPLASH, SPLASH_BACKGROUND } = process.env;

const config = {
    profile: true,
    watch: process.env.NODE_ENV === 'development' ? true : false,
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    entry: {
        index: path.resolve(JS),
    },
    output: {
        publicPath: '/',
        path: path.resolve('./dist'),
        chunkFilename: '[name].chunk.js?hash=[chunkhash]',
        filename: '[name].js?hash=[hash]',
        crossOriginLoading: 'anonymous',
    },
    devtool: process.env.NODE_ENV === 'development' ? 'eval-sourcemap' : 'source-map',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true,
        open: true,
        host: '0.0.0.0',
        port: 8443,
        https: {
            cert: fs.readFileSync(SSL_CERT),
            ca: fs.readFileSync(SSL_CA),
            key: fs.readFileSync(SSL_KEY),
        },
        disableHostCheck: true,
        quiet: true,
        clientLogLevel: 'warning',
        writeToDisk: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
    },
    resolve: {
        alias: {
            'react': 'preact/compat',
            'react-dom': 'preact/compat',
        },
    },
    module: {
        rules: [{
            test: /\.(js|jsx|mjs)$/i,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                },
            }],
        },{
            test: /\.(css)$/,
            use: [{
                loader: 'style-loader',
            },{
                loader: 'css-loader',
            }],
        },{
            test: /\.(woff|woff2|ttf|eot)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    fallback: 'file-loader',
                    outputPath: 'assets/fonts',
                    name: '[name].[ext]?hash=[hash]',
                },
            }],
        },{
            test: /\.(jpg|jpeg|png|gif|svg)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    fallback: 'file-loader',
                    outputPath: 'assets/images',
                    name: '[name].[ext]?hash=[hash]',
                },
            },{
                loader: 'img-loader',
            }]
        },{
            test: /\.(txt)$/i,
            use: [{
                loader: 'raw-loader',
            }],
        }],
    },
    plugins: [
        new CleanPlugin({
            cleanOnceBeforeBuildPatterns: path.resolve('./dist'),
        }),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new NotifierPlugin({
            title: pkg.name,
            alwaysNotify: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: process.env.NODE_ENV === 'production',
            defaultSizes: 'gzip',
        }),
        new Html5Plugin({
            title: pkg.name,
            input: path.resolve(HTML),
            favicon: FAVICON ? path.resolve(FAVICON) : undefined,
            splash: SPLASH ? path.resolve(SPLASH) : undefined,
            splashBackground: SPLASH_BACKGROUND || undefined,
            minify: process.env.NODE_ENV === 'production',
            manifest: true,
        }),
        new OpenBrowserPlugin(),
    ],
};

if (process.env.NODE_ENV !== 'development') {
    config.optimization = {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    compress: {
                        inline: false,
                    },
                    keep_fnames: true,
                    keep_classnames: true,
                },
            }),
        ],
    };

    config.plugins = [
        ...config.plugins,
        new CompressionPlugin({
            filename: '[path].gz?[query]',
        }),
    ];
}

export default config;