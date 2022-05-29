const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const modeConfiguration = env => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode } = { mode: "production" }) => {
    console.log(`mode is: ${mode}`);

    return merge({
        mode,
        entry: "./src/index.js",
        devServer: {
            hot: true,
            https: true,
            devMiddleware: {
                writeToDisk: true
            },
            allowedHosts: 'all',
            client: {
                webSocketURL: 'wss://localhost:8081/ws'
            },
            port: 8081
        },
        output: {
            publicPath: "/",
            path: path.resolve(__dirname, "build"),
            filename: "bundle.js"
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html"
            }),
            new webpack.HotModuleReplacementPlugin(),
            new InterpolateHtmlPlugin({
                PUBLIC_URL: 'static' // can modify `static` to another name or get it from `process`
            })
        ],
    },
        modeConfiguration(mode)
    );
};
