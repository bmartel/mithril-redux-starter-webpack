# mithril-redux-starter-webpack

## What's provided?

A full development ecosystem is preconfigured to work immediately with webpack v4, best practices with codesplitting, dynamic imports, server side rendering, state management, testing, and atomic css styling.

1. [mithril](https://github.com/lhorie/mithril.js) with:

- [midux - mithril redux adapter](https://github.com/bmartel/midux)
- [mitts - mithril toolkit for dynamic import and server side component render](https://github.com/bmartel/mitts)

2. Build: [webpack](https://github.com/webpack/webpack)

3. State management: [redux](https://github.com/reduxjs/redux) with:

- [logger](https://github.com/LogRocket/redux-logger)
- [thunk](https://github.com/reduxjs/redux-thunk)

4. Styling: [postcss](https://github.com/postcss/postcss) with:

- [tailwindcss](https://github.com/tailwindcss/tailwindcss)
- [functions](https://github.com/andyjansson/postcss-functions)

5. Testing with:

- [mocha](https://github.com/mochajs/mocha)
- [chai](https://github.com/chaijs/chai)
- [sinon](https://github.com/sinonjs/sinon)

6. Code styles:

- [eslint](https://github.com/eslint/eslint)
- [prettier](https://github.com/prettier/prettier)
- [prettier-eslint](https://github.com/prettier/prettier-eslint)

## Quick start

```
$ yarn install
$ yarn start
```

and navigate to http://localhost:9000

## Server side rendering

```
$ yarn serve
```

and navigate to http://localhost:3000

## Commands

- `yarn build` - production build of assets for deployment.
- `yarn build:dev` - development build of assets.
- `yarn start` - automatically build assets on file changes and start a development server with hot reload.
- `yarn serve` - build production assets and start an express based nodejs server for server side rendering.
- `yarn lint` - lint all files and fix with eslint and prettier.
- `yarn test` - run application tests.
