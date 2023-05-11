[![cover][cover-src]][cover-href]
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

> 🕵️‍♂️ Detect JS environment easily.

## Install:

```sh
# nyxi
nyxi envizor

#pnpm
pnpm add envizor

# Using npm
npm i envizor

# Using Yarn
yarn add envizor
```

## Usage

```ts
// ESM
import { isWindows } from 'envizor'

// CommonJS
const { isCI } = require('envizor')
```

Available exports:

- `hasTTY`
- `hasWindow`
- `isCI`
- `isDebug`
- `isDevelopment`
- `isLinux`
- `isMacOS`
- `isMinimal`
- `isProduction`
- `isTest`
- `isWindows`
- `platform`
- `provider`

You can read more about how each flag works from [./src/index.ts](./src/index.ts).

List of well known providers can be found from [./src/providers.ts](./src/providers.ts).


## License

[MIT](./LICENSE) - Made with 💞

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/envizor?style=flat&colorA=18181B&colorB=14F195
[npm-version-href]: https://npmjs.com/package/envizor
[npm-downloads-src]: https://img.shields.io/npm/dm/envizor?style=flat&colorA=18181B&colorB=14F195
[npm-downloads-href]: https://npmjs.com/package/envizor
[bundle-src]: https://img.shields.io/bundlephobia/minzip/envizor?style=flat&colorA=18181B&colorB=14F195
[bundle-href]: https://bundlephobia.com/result?p=envizor
[license-src]: https://img.shields.io/github/license/nyxblabs/CodeBoost.svg?style=flat&colorA=18181B&colorB=14F195
[license-href]: https://github.com/nyxblabs/CodeBoost/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsDocs.io-reference-18181B?style=flat&colorA=18181B&colorB=14F195
[jsdocs-href]: https://www.jsdocs.io/package/envizor

<!-- Covers -->
[cover-src]: https://raw.githubusercontent.com/nyxblabs/utilities/main/.github/assets/cover-github-envizor.png
[cover-href]: https://💻nyxb.ws
