<p align="center">
<img src="https://raw.githubusercontent.com/nyxblabs/utilities/main/.github/assets/cover-envizor_light.png#gh-light-mode-only">
</p>

[![npm](https://img.shields.io/npm/dm/envizor.svg?style=flat-square)](http://npmjs.com/package/envizor)
[![npm](https://img.shields.io/npm/v/envizor.svg?style=flat-square)](http://npmjs.com/package/envizor)
[![bundlephobia](https://img.shields.io/bundlephobia/min/envizor/latest.svg?style=flat-square)](https://bundlephobia.com/result?p=envizor)

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
