import path from "path";

const common = {
  entry: {
    app: './js/app.js',
  },
  output: {
    path: path.resolve(import.meta.dirname, 'dist'),
    clean: true,
    filename: './js/app.js',
  },
};

export default common;
