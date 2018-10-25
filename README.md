# mithril-redux-starter-webpack

# including modules

1.  [mithril](https://github.com/lhorie/mithril.js)
2.  [redux](https://github.com/rackt/redux) with:

* [logger](https://github.com/fcomb/redux-logger)
* [thunk](https://github.com/gaearon/redux-thunk)

3.  [webpack](https://npmjs.com/package/webpack)
4.  [postcss](https://github.com/postcss/postcss) with:

* [tailwindcss](https://github.com/tailwindcss/tailwindcss)
* [functions](https://github.com/andyjansson/postcss-functions)

# quick start

```
$ yarn install
$ yarn start
```

and navigate to http://localhost:9000

# commands

* `yarn build` - production build of assets for deployment
* `yarn build:dev` - development build of assets
* `yarn start` - automatically build assets on file changes and start a development server with hot reload.
* `yarn lint` - lint all files and fix with eslint and prettier
