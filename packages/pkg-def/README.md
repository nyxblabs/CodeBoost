[![cover][cover-src]][cover-href]
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

> 🔧 Enhance your Node.js development experience with powerful utilities and TypeScript definitions for managing your `package.json` and `tsconfig.json files`.

## Install

```sh
# nyxi
nyxi pkg-def

# pnpm
pnpm add pkg-def

# npm
npm i pkg-def

# yarn
yarn add pkg-def
```

## Usage

### `readPackageJSON`

```js
import { readPackageJSON } from 'pkg-def'
const localPackageJson = await readPackageJSON()
// or
const packageJson = await readPackageJSON('/fully/resolved/path/to/folder')
```

### `writePackageJSON`

```js
import { writePackageJSON } from 'pkg-def'

await writePackageJSON('path/to/package.json', pkg)
```

### `resolvePackageJSON`

```js
import { resolvePackageJSON } from 'pkg-def'
const filename = await resolvePackageJSON()
// or
const packageJson = await resolvePackageJSON('/fully/resolved/path/to/folder')
```

### `readTSConfig`

```js
import { readTSConfig } from 'pkg-def'
const tsconfig = await readTSConfig()
// or
const tsconfig = await readTSConfig('/fully/resolved/path/to/folder')
```

### `writeTSConfig`

```js
import { writeTSConfig } from 'pkg-def'

await writeTSConfig('path/to/tsconfig.json', tsconfig)
```

### `resolveTSConfig`

```js
import { resolveTSConfig } from 'pkg-def'
const filename = await resolveTSConfig()
// or
const tsconfig = await resolveTSConfig('/fully/resolved/path/to/folder')
```

### `resolveFile`

```js
import { resolveFile } from 'pkg-def'
const filename = await resolveFile('README.md', {
  startingFrom: id,
  rootPattern: /^node_modules$/,
  matcher: filename => filename.endsWith('.md'),
})
```

### `resolveLockFile`

Find path to the lock file (`yarn.lock`, `package-lock.json`, `pnpm-lock.yaml`, `npm-shrinkwrap.json`) or throws an error.

```js
import { resolveLockFile } from 'pkg-def'
const lockfile = await resolveLockFile('.')
```

### `findWorkspaceDir`

Try to detect workspace dir by in order:

1. Nearest `.git` directory
2. Farthest lockfile
3. Farthest `package.json` file

If fails, throws an error.

```js
import { findWorkspaceDir } from 'pkg-def'
const workspaceDir = await findWorkspaceDir('.')
```

## Types

**Note:** In order to make types working, you need to install `typescript` as a devDependency.

You can directly use typed interfaces:

```ts
import type { TSConfig, PackageJSON } from 'pkg-def'
```

You can also use define utils for type support for using in plain `.js` files and auto-complete in IDE.

```js
import type { definePackageJSON } from 'pkg-def'

const pkg = definePackageJSON({})
```

```js
import type { defineTSConfig } from 'pkg-def'

const pkg = defineTSConfig({})
```

## License

[MIT](./LICENSE) - Made with 💞

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/pkg-def?style=flat&colorA=18181B&colorB=14F195
[npm-version-href]: https://npmjs.com/package/pkg-def
[npm-downloads-src]: https://img.shields.io/npm/dm/pkg-def?style=flat&colorA=18181B&colorB=14F195
[npm-downloads-href]: https://npmjs.com/package/pkg-def
[license-src]: https://img.shields.io/github/license/nyxblabs/CodeBoost.svg?style=flat&colorA=18181B&colorB=14F195
[license-href]: https://github.com/nyxblabs/CodeBoost/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsDocs.io-reference-18181B?style=flat&colorA=18181B&colorB=14F195
[jsdocs-href]: https://www.jsdocs.io/package/pkg-def

<!-- Covers -->
[cover-src]: https://raw.githubusercontent.com/nyxblabs/utilities/main/.github/assets/cover-github-pkg-def.png
[cover-href]: https://💻nyxb.ws
