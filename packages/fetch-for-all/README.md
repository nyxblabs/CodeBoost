<p align="center">
<img src="https://raw.githubusercontent.com/nyxblabs/utilities/main/.github/assets/cover-fetch-for-all.png">
</p>

[![][npm-version-src]][npm-version-href]
[![][packagephobia-src]][packagephobia-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]


> A redistribution of [node-fetch v3](https://github.com/node-fetch/node-fetch) for better backward and forward compatibility.

🌟 **Why this package?** 🌟

- We can no longer `require('node-fetch')` with the latest version 😢. This stopped popular libraries from upgrading and caused dependency conflicts between `node-fetch@2` and `node-fetch@3`.
- With upcoming versions of Node.js, native `fetch` is being supported 🚀. We're prepared for native fetch support using this package, yet we'll keep supporting older Node versions.

**Features:** 🎉

🌐 Prefers **native globals** when available (See Node.js [experimental fetch](https://nodejs.org/dist/latest-v17.x/docs/api/cli.html#--experimental-fetch)).

📦 Compact build and smaller install size with **zero dependencies** [![][packagephobia-s-src]][packagephobia-s-href] <sup>vs</sup> [![][packagephobia-s-alt-src]][packagephobia-s-alt-href]

🔗 Supports both **CommonJS** (`require`) and **ESM** (`import`) usage

🚧 Uses native version if imported without `node` condition using [conditional exports](https://nodejs.org/api/packages.html#packages_conditional_exports) with **zero bundle overhead**

🔄 Polyfill support for Node.js


## Usage

Install `fetch-for-all` 
dependency:

```sh
# nyxi
pnpm i fetch-for-all

# pnpm
pnpm add fetch-for-all

# npm
npm i yarn add fetch-for-all

# yarn
yarn add fetch-for-all
```

You can now either import or require the dependency:

```js
// ESM
import fetch from 'fetch-for-all'

// CommonJS
const fetch = require('fetch-for-all')
```

More named exports:

```ts
// ESM
import { fetch, Blob, FormData, Headers, Request, Response, AbortController } from 'fetch-for-all'

// CommonJS
const { fetch, Blob, FormData, Headers, Request, Response, AbortController } = require('fetch-for-all')
```

## Force using non-native version

Sometimes you want to explicitly use none native (`node-fetch`) implementation of `fetch` in case of issues with native/polyfill version of `globalThis.fetch` with Node.js or runtime environment.

You have two ways to do this:

- Set `FORCE_NODE_FETCH` environment variable before starting application.
- Import from `fetch-for-all/node`

## Polyfill support

Using the polyfill method, we can once ensure global fetch is available in the environment and all files. Natives are always preferred.

**Note:** I don't recommand this if you are authoring a library! Please prefer explicit methods.

```ts
// ESM
import 'fetch-for-all/polyfill'

// CJS
require('fetch-for-all/polyfill')

// You can now use fetch() without any import!
```

## Alias to `node-fetch`

Using this method, you can ensure all project dependencies and usages of `node-fetch` can benefit from improved `fetch-for-all` and won't conflict between `node-fetch@2` and `node-fetch@3`.

### npm

Using npm [overrides](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#overrides):

```jsonc
// package.json
{
  "overrides": {
    "node-fetch": "npm:fetch-for-all@latest"
  }
}
```

### yarn

Using yarn [selective dependency resolutions](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/):

```jsonc
// package.json
{
  "resolutions": {
    "node-fetch": "npm:fetch-for-all@latest"
  }
}
```

### pnpm

Using [pnpm.overrides](https://pnpm.io/package_json#pnpmoverrides):

```jsonc
// package.json
{
  "pnpm": {
    "overrides": {
      "node-fetch": "npm:fetch-for-all@latest"
    }
  }
}
```

## License

Made with 💞

fetch-for-all is published under the MIT LICENSE

<!-- Badges -->
[npm-version-src]: https://flat.badgen.net/npm/v/fetch-for-all
[npm-version-href]: https://npmjs.com/package/fetch-for-all

[npm-downloads-src]: https://flat.badgen.net/npm/dm/fetch-for-all
[npm-downloads-href]: https://npmjs.com/package/fetch-for-all

[packagephobia-src]: https://flat.badgen.net/packagephobia/install/fetch-for-all
[packagephobia-href]: https://packagephobia.com/result?p=fetch-for-all

[packagephobia-s-src]: https://flat.badgen.net/packagephobia/install/fetch-for-all?label=fetch-native&scale=.9
[packagephobia-s-href]: https://packagephobia.com/result?p=fatch-for-all

[packagephobia-s-alt-src]: https://flat.badgen.net/packagephobia/install/node-fetch?label=node-fetch&scale=.9
[packagephobia-s-alt-href]: https://packagephobia.com/result?p=node-fetch
