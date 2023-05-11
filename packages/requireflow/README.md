[![cover][cover-src]][cover-href]
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

> 🔌👨‍💻 Need to polyfill Node.js [`module.createRequire`](https://nodejs.org/api/modules.html#modules_module_createrequire_filename) (<= v12.2.0)? Look no further! This package provides a seamless solution for developers to ensure their code is fully supported across different Node.js versions. 🚀 Upgrade your development experience with ease using this polyfill package.

## Install

```sh
# nyxi
nyxi requireflow

#pnpm
pnpm add requireflow

#npm
npm i requireflow

# yarn
yarn add requireflow
```

## Usage

```ts
function createRequire(filename: string | URL): NodeRequire
```

```ts
const createRequire = require('requireflow')

const myRequire = createRequire('path/to/test.js')
const myModule = myRequire('./test-sibling-module')
```

## License

[MIT](./LICENSE) - Made with 💞

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/requireflow?style=flat&colorA=18181B&colorB=14F195
[npm-version-href]: https://npmjs.com/package/requireflow
[npm-downloads-src]: https://img.shields.io/npm/dm/requireflow?style=flat&colorA=18181B&colorB=14F195
[npm-downloads-href]: https://npmjs.com/package/requireflow
[bundle-src]: https://img.shields.io/bundlephobia/minzip/requireflow?style=flat&colorA=18181B&colorB=14F195
[bundle-href]: https://bundlephobia.com/result?p=requireflow
[license-src]: https://img.shields.io/github/license/nyxblabs/CodeBoost.svg?style=flat&colorA=18181B&colorB=14F195
[license-href]: https://github.com/nyxblabs/CodeBoost/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsDocs.io-reference-18181B?style=flat&colorA=18181B&colorB=14F195
[jsdocs-href]: https://www.jsdocs.io/package/requireflow

<!-- Covers -->
[cover-src]: https://raw.githubusercontent.com/nyxblabs/utilities/main/.github/assets/cover-github-requireflow.png
[cover-href]: https://💻nyxb.ws

