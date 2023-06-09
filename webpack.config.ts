import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import Dotenv from "dotenv-webpack";

interface IProps {
  mode: string;
  port: number;
}

export default (env: IProps) => {
  return {
    mode: env.mode || "development",
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "build"),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            env.mode === "development"
              ? "style-loader"
              : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      preferAbsolute: true,
      mainFiles: ["index"],
      alias: {},
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
        favicon: path.resolve(__dirname, "public", "fire_icon.ico"),
      }),
      new webpack.ProgressPlugin(),
      new Dotenv({
        path: `./.env.development`,
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      }),
    ],
    devtool: "inline-source-map",
    devServer:
      env.mode === "development"
        ? { port: env.port || 3000, open: true, historyApiFallback: true }
        : undefined,
  };
};
