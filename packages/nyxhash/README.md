[![cover][cover-src]][cover-href]
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

> ⚡ Super fast hashing library

## Usage

Install package:

```sh
# nyxi
nyxi nyxhash

# pnpm
pnpm i nyxhash

# npm
npm i nyxhash

# yarn
yarn add nyxhash
```

Import:

```ts
// ESM
import { hash, murmurHash, objectHash, sha256 } from 'nyxhash'

// CommonJS
const { hash, objectHash, murmurHash, sha256 } = require('nyxhash')
```

### `hash(object, options?)`

Converts object value into a string hash using `objectHash` and then applies `sha256` with Base64 encoding (trimmed by length of 10).

Usage:

```ts
import { hash } from 'nyxhash'

// "dZbtA7f0lK"
console.log(hash({ foo: 'bar' }))
```

### `objectHash(object, options?)`

Converts a nest object value into a stable and safe string for hashing.

Usage:

```ts
import { objectHash } from 'nyxhash'

// "object:1:string:3:foo:string:3:bar,"
console.log(objectHash({ foo: 'bar' }))
```

### `isEqual(obj1, obj2, options?)`

Compare two objects using reference equality and stable object hashing.

Usage:

```ts
import { isEqual } from 'nyxhash'

// true
console.log(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 }))
```

### `diff(obj1, obj2, options?)`

Compare two objects with nested hashing. Returns an array of changes.

Returned value is an array of diff entries with `$key`, `$hash`, `$value` and `$props`. When logging, a string version of changelog is displayed.

Usage:

```ts
import { diff } from 'nyxhash'

function createObject() {
   return {
      foo: 'bar',
      nested: {
         y: 123,
         bar: {
            baz: '123',
         },
      },
   }
}

const obj1 = createObject()
const obj2 = createObject()

obj2.nested.x = 123
delete obj2.nested.y
obj2.nested.bar.baz = 123

const diff = diff(obj1, obj2)

// [-] Removed nested.y
// [~] Changed nested.bar.baz from "123" to 123
// [+] Added   nested.x
console.log(diff(obj1, obj2))
```

### `murmurHash(str)`

Converts input string (of any length) into a 32-bit positive integer using [MurmurHash3](<(https://en.wikipedia.org/wiki/MurmurHash)>).

Usage:

```ts
import { murmurHash } from 'nyxhash'

// "2708020327"
console.log(murmurHash('Hello World'))
```

### `sha256`

Create a secure [SHA 256](https://en.wikipedia.org/wiki/SHA-2) digest from input string.

```ts
import { sha256 } from 'nyxhash'

// "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"
console.log(sha256('Hello World'))
```

### `sha256base64`

Create a secure [SHA 256](https://en.wikipedia.org/wiki/SHA-2) digest in Base64 encoding from input string.

```ts
import { sha256base64 } from 'nyxhash'

// "pZGm1Av0IEBKARczz7exkNYsZb8LzaMrV7J32a2fFG4"
console.log(sha256base64('Hello World'))
```

## 💻 Development

- Clone this repository
- Navigate to pacckages/nyxhash
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
- Install dependencies using `nyxi`
- Run interactive tests using `nyxr dev`

## License

Made with 💞

Published under [MIT License](./LICENSE).

Based on [puleos/object-hash](https://github.com/puleos/object-hash) by [Scott Puleo](https://github.com/puleos/), and implementations from [perezd/node-murmurhash](perezd/node-murmurhash) and
[garycourt/murmurhash-js](https://github.com/garycourt/murmurhash-js) by [Gary Court](mailto:gary.court@gmail.com) and [Austin Appleby](mailto:aappleby@gmail.com) and [brix/crypto-js](https://github.com/brix/crypto-js).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nyxhash?style=flat&colorA=18181B&colorB=14F195
[npm-version-href]: https://npmjs.com/package/nyxhash
[npm-downloads-src]: https://img.shields.io/npm/dm/nyxhash?style=flat&colorA=18181B&colorB=14F195
[npm-downloads-href]: https://npmjs.com/package/nyxhash
[bundle-src]: https://img.shields.io/bundlephobia/minzip/nyxhash?style=flat&colorA=18181B&colorB=14F195
[bundle-href]: https://bundlephobia.com/result?p=nyxhash
[license-src]: https://img.shields.io/github/license/nyxblabs/CodeBoost.svg?style=flat&colorA=18181B&colorB=14F195
[license-href]: https://github.com/nyxblabs/CodeBoost/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsDocs.io-reference-18181B?style=flat&colorA=18181B&colorB=14F195
[jsdocs-href]: https://www.jsdocs.io/package/nyxhash

<!-- Covers -->
[cover-src]: https://raw.githubusercontent.com/nyxblabs/utilities/main/.github/assets/cover-github-nyxhash.png
[cover-href]: https://💻nyxb.ws

