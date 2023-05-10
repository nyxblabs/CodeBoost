<p align="center">
<img src="https://raw.githubusercontent.com/nyxblabs/utilities/main/.github/assets/cover-requireflow_light.png#gh-light-mode-only">
</p>

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

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
[npm-version-src]: https://img.shields.io/npm/v/requireflow?style=flat-square
[npm-version-href]: https://npmjs.com/package/requireflow

[npm-downloads-src]: https://img.shields.io/npm/dm/requireflow?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/requireflow

