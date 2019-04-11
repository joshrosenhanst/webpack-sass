# Webpack Sass Starter

Starter kit for a Webpack project including Sass.

## Features

- ES2015+ support via [babel 7](https://babeljs.io/)
- Sass support via [sass-loader](https://github.com/webpack-contrib/sass-loader)
- Linting via [eslint-loader](https://github.com/webpack-contrib/eslint-loader)
- Image support via [file-loader](https://github.com/webpack-contrib/file-loader)

## Default Directories

- `src/public` - All assets in this directory will be copied into the `dist/assets/` directory.
- `src/assets` - Static assets that will be imported into the project on demand. File loader will automatically move them into `dist/assets/`
- `src/pages` - Template and script files for each page in the app. When you create new pages you need to add a new `HtmlWebpackPlugin()` declaration in the `webpack.config.js` file. You can also rewrite all of this config to use a single `index.js` file instead.
- `src/components` - JS components that can be imported into pages.

## Build Scripts
- `npm run build` - Build development bundle in the `dist` directory. Assets are placed in the `dist/assets/` directory.
- `npm run start` - Run Webpack Dev Server which automatically reloads on CSS/JS changes.
- `npm run production` - Build production bundle with minified code.
