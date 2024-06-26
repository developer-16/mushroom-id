import HtmlWebpackPlugin from "html-webpack-plugin";
import common from "./webpack.common.js";
import CopyPlugin from "copy-webpack-plugin";

const config = {
  ...common,
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: false,
    }),
    new CopyPlugin({
      patterns: [
        {from: 'img', to: 'img'},
        {from: 'css', to: 'css'},
        {from: 'js/vendor', to: 'js/vendor'},
        {from: 'icon.svg', to: 'icon.svg'},
        {from: 'favicon.ico', to: 'favicon.ico'},
        {from: 'robots.txt', to: 'robots.txt'},
        {from: 'icon.png', to: 'icon.png'},
        {from: '404.html', to: '404.html'},
        {from: 'site.webmanifest', to: 'site.webmanifest'},
      ],
    }),
  ],
}

export default config;
