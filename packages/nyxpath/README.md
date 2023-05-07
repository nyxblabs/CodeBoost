![Cover](https://github.com/nyxblabs/nyxcfg/blob/main/.github/assets/cover-nyxpath.jpg)

[![version][npm-v-src]][npm-v-href]
[![downloads][npm-d-src]][npm-d-href]
[![size][size-src]][size-href]

>💡 **Why**
>
>Have you ever wondered why the path separators for Windows and macOS, Linux, and other Posix operating systems are different? It turns out that for 🕰️ historical reasons, Windows chose to use backslashes `\` for separating paths instead of the slash `/` used by other operating systems. Nowadays, [Windows](https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file?redirectedfrom=MSDN) supports both slashes and backslashes for paths, but this can lead to inconsistent code behavior. When running on a Windows operating system, Node.js's built-in [path module](https://nodejs.org/api/path.html) assumes that Windows-style paths are being used, which makes for inconsistent code behavior between Windows and POSIX.
>
>👉 This is where pathe comes in! It provides **identical exports** to Node.js's built-in path module, but with normalization on **all operations** and written in modern **ESM/Typescript**. Plus, it has **no dependency on Node.js**! 🤯 
>
>🚀 This package is a drop-in replacement for the Node.js path module and ensures that paths are normalized with a slash `/` for consistent code behavior across all environments, including Node.js. So why not give pathe a try and start enjoying normalized paths? 🔧
>
>🌟 With pathe, you can rest assured that your code will behave consistently and seamlessly, regardless of the operating system you are using. Happy coding! 🚀


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

Pathe exports some extra utilities that do not exist in standard Node.js [path module](https://nodejs.org/api/path.html).
In order to use them, you can import from `nyxpath/utils` subpath:

```ts
import { filename, normalizeAliases, resolveAlias } from 'nyxpath/utils'
```

## 🔒 License

MIT. Made with 💞

Some code used from Node.js project. See [LICENSE](./LICENSE).

<!-- Refs -->
[npm-v-src]: https://img.shields.io/npm/v/nyxpath?style=flat-square
[npm-v-href]: https://npmjs.com/package/nyxpath

[npm-d-src]: https://img.shields.io/npm/dm/nyxpath?style=flat-square
[npm-d-href]: https://npmjs.com/package/nyxpath

[github-actions-src]: https://img.shields.io/github/workflow/status/nyxblabs/nyxpath/ci/main?style=flat-square
[github-actions-href]: https://github.com/nyxblabs/nyxpath/actions?query=workflow%3Aci

[size-src]: https://packagephobia.now.sh/badge?p=nyxpath
[size-href]: https://packagephobia.now.sh/result?p=nyxpath
