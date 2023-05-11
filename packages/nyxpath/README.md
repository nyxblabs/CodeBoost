[![cover][cover-src]][cover-href]
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

>💡 **Why**
>
>Have you ever wondered why the path separators for Windows and macOS, Linux, and other Posix operating systems are different? It turns out that for 🕰️ historical reasons, Windows chose to use backslashes `\` for separating paths instead of the slash `/` used by other operating systems. Nowadays, [Windows](https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file?redirectedfrom=MSDN) supports both slashes and backslashes for paths, but this can lead to inconsistent code behavior. When running on a Windows operating system, Node.js's built-in [path module](https://nodejs.org/api/path.html) assumes that Windows-style paths are being used, which makes for inconsistent code behavior between Windows and POSIX.
>
>👉 This is where nyxpath comes in! It provides **identical exports** to Node.js's built-in path module, but with normalization on **all operations** and written in modern **ESM/Typescript**. Plus, it has **no dependency on Node.js**! 🤯 
>
>🚀 This package is a drop-in replacement for the Node.js path module and ensures that paths are normalized with a slash `/` for consistent code behavior across all environments, including Node.js. So why not give nyxpath a try and start enjoying normalized paths? 🔧
>
>🌟 With nyxpath, you can rest assured that your code will behave consistently and seamlessly, regardless of the operating system you are using. Happy coding! 🚀


## 🛠️ Usage

Install using [nyxi](https://github.com/nyxblabs/nyxi), pnpm, npm or yarn:

```bash
# nyxi
nyxi nyxpath

# pnpm 
pnpm i nyxpath

# npm
npm i nyxpath

# yarn
yarn add nyxpath
```

Import:

```js
// ESM / Typescript
import { resolve } from 'nyxpath'

// CommonJS
const { resolve } = require('nyxpath')
```

📖 Read more about path utils from [Node.js documentation](https://nodejs.org/api/path.html) and rest assured behavior is ALWAYS like POSIX regardless of your input paths format and running platform!

### 🎁 Extra utilties

Nyxpath exports some extra utilities that do not exist in standard Node.js [path module](https://nodejs.org/api/path.html).
In order to use them, you can import from `nyxpath/utils` subpath:

```ts
import { filename, normalizeAliases, resolveAlias } from 'nyxpath/utils'
```

## 🔒 License

[MIT](./LICENSE) - Made with 💞

Some code used from Node.js project. See [LICENSE](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nyxpath?style=flat&colorA=18181B&colorB=14F195
[npm-version-href]: https://npmjs.com/package/nyxpath
[npm-downloads-src]: https://img.shields.io/npm/dm/nyxpath?style=flat&colorA=18181B&colorB=14F195
[npm-downloads-href]: https://npmjs.com/package/nyxpath
[bundle-src]: https://img.shields.io/bundlephobia/minzip/nyxpath?style=flat&colorA=18181B&colorB=14F195
[bundle-href]: https://bundlephobia.com/result?p=nyxpath
[license-src]: https://img.shields.io/github/license/nyxblabs/CodeBoost.svg?style=flat&colorA=18181B&colorB=14F195
[license-href]: https://github.com/nyxblabs/CodeBoost/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsDocs.io-reference-18181B?style=flat&colorA=18181B&colorB=14F195
[jsdocs-href]: https://www.jsdocs.io/package/nyxpath

<!-- Covers -->
[cover-src]: https://raw.githubusercontent.com/nyxblabs/utilities/main/.github/assets/cover-github-nyxpath.png
[cover-href]: https://💻nyxb.ws
