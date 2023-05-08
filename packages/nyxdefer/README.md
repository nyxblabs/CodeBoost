<p align="center">
<img src="https://raw.githubusercontent.com/nyxblabs/utilities/main/.github/assets/cover-nyxdefer_light.png#gh-light-mode-only">
<img src="https://raw.githubusercontent.com/nyxblabs/utilities/main/.github/assets/cover-nyxdefer_black.png#gh-dark-mode-only">
</p>

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]


> 🚀 An improved debounce function with Promise support.

- ✅ Well tested debounce implementation
- 🔄 Native Promise support
- 🔒 Avoid duplicate calls while promise is being resolved
- ⚙️ Configurable `trailing` and `leading` behavior

## Usage

Install package:

```sh
#nyxi
nyxi nyxdefer

# pnpm
pnpm add nyxdefer

# npm
npm install nyxdefer

# yarn
yarn add nyxdefer
```

Import:

```js
// ESM
import { nyxdefer } from 'nyxdefer'

// CommonJS
const { nxdefer } = require('nyxdefer')
```

Debounce function:

```js
const nyxdeferred = debounce(async () => {
   // Some heavy stuff
}, 25)
```

When calling `nyxdefered`, it will wait at least for `25ms` as configured before actually calling our function. This helps to avoid multiple calls.

To avoid initial wait, we can set `leading: true` option. It will cause function to be immediately called if there is no other call:

```js
const nyxdeferred = debounce(async () => {
   // Some heavy stuff
}, 25, { leading: true })
```

If executing async function takes longer than nyxdefer value, duplicate calls will be still prevented a last call will happen. To disable this behavior, we can set `trailing: false` option:

```js
const nyxdeferred = nyxdefer(async () => {
   // Some heavy stuff
}, 25, { trailing: false })
```

## 💻 Development

- Clone this repository
- Navigate to packages/nyxdefer
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
- Install dependencies using `nyxi`
- Run interactive tests using `nyxr dev`

## License

Made with 💞

Based on [sindresorhus/p-debounce](https://github.com/sindresorhus/p-debounce).

Published under [MIT License](./LICENSE).

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nyxdefer?style=flat-square
[npm-version-href]: https://npmjs.com/package/nyxdefer

[npm-downloads-src]: https://img.shields.io/npm/dm/nyxdefer?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/nyxdefer
