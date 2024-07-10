import common from "./webpack.common.js";

const config = {
  ...common,
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    liveReload: true,
    hot: true,
    open: true,
    static: ['./'],
  },
}

export default config;
