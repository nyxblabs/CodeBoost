<p align="center">
<img src="https://raw.githubusercontent.com/nyxblabs/utilities/main/.github/assets/cover-nyxjson_light.png#gh-light-mode-only">
<img src="https://raw.githubusercontent.com/nyxblabs/utilities/main/.github/assets/cover-nyxjson_black.png#gh-dark-mode-only">
</p>

> A faster, secure and convenient alternative for [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse):

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]

## Usage

### Node.js

Install:

```bash
# nyxi
nyxi nyxjson

# pnpm
pnpm add nyxjson

# npm
npm i nyxjson

# yarn
yarn add nyxjson
```

Import into your Node.js project:

```ts
// CommonJS
const nyxjson = require('nyxjson')

// ESM
import nyxjson from 'nyxjson'
```

### Deno

```ts
import nyxjson from 'https://deno.land/x/nyxjson/src/index.ts'

console.log(nyxjson('{ "deno": "yay" }'))
```


## Why?

**Fast fallback to input if is not string:**

```ts
// Uncaught SyntaxError: Unexpected token u in JSON at position 0
JSON.parse()

// undefined
nyxjson()
```

**Fast lookup for known string values:**

```ts
// Uncaught SyntaxError: Unexpected token T in JSON at position 0
JSON.parse('TRUE')

// true
nyxjson('TRUE')
```

**Fallback to original value if parse fails (empty or any plain string):**

```ts
// Uncaught SyntaxError: Unexpected token s in JSON at position 0
JSON.parse('dudel')

// "salam"
nyxjson('dudel')
```

**Avoid prototype pollution:**

```ts
const input = '{ "user": { "__proto__": { "isAdmin": true } } }'

// { user: { __proto__: { isAdmin: true } } }
JSON.parse(input)

// { user: {} }
nyxjson(input)
```

### Strict Mode

If `{ strict: true }` passed as second argument, `nyxjson` will throw an error if the input is not a valid JSON string or parsing fails. (non string values and built-ins will be still returned as-is)

```ts
// Returns "[foo"
nyxjson('[foo')

// Throws an error
nyxjson('[foo', { strict: true })
```

## Benchmarks

Locally try with `nyxr benchmark`. Below are esults on Node.js 18.11.0 with MBA M2.

**Note** `nyxjson` is sometimes little bit slower than `JSON.parse` when parsing a valid JSON string mainly because of transform to avoid [prototype pollution](https://learn.snyk.io/lessons/prototype-pollution/javascript/) which can lead to serious security issues if not being sanitized. In the other words, `nyxjson` is better when input is not always a json string or from untrusted source like request body.

```
=== Non-string fallback ==
JSON.parse x 10,323,718 ops/sec ±0.45% (96 runs sampled)
nyxjson x 1,057,268,114 ops/sec ±1.71% (90 runs sampled)
nyxjson (strict) x 977,215,995 ops/sec ±1.43% (97 runs sampled)
sjson:
@hapi/bourne x 10,151,985 ops/sec ±0.76% (96 runs sampled)
Fastest is nyxjson

=== Known values ==
JSON.parse x 16,359,358 ops/sec ±0.90% (92 runs sampled)
nyxjson x 107,849,085 ops/sec ±0.34% (97 runs sampled)
nyxjson (strict) x 107,891,427 ops/sec ±0.34% (99 runs sampled)
sjson x 14,216,957 ops/sec ±0.98% (89 runs sampled)
@hapi/bourne x 15,209,152 ops/sec ±1.08% (88 runs sampled)
Fastest is nyxjson (strict),nyxjson

=== Plain string ==
JSON.parse (try-catch) x 211,560 ops/sec ±0.84% (92 runs sampled)
nyxjson x 60,315,113 ops/sec ±0.46% (98 runs sampled)
nyxjson (strict):
sjson (try-catch) x 186,492 ops/sec ±0.70% (97 runs sampled)
@hapi/bourne:
Fastest is nyxjson

=== standard object ==
JSON.parse x 492,180 ops/sec ±0.98% (98 runs sampled)
nyxjson x 356,819 ops/sec ±0.40% (98 runs sampled)
nyxjson (strict) x 412,955 ops/sec ±0.88% (94 runs sampled)
sjson x 437,376 ops/sec ±0.42% (102 runs sampled)
@hapi/bourne x 457,020 ops/sec ±0.81% (99 runs sampled)
Fastest is JSON.parse

=== invalid syntax ==
JSON.parse (try-catch) x 493,739 ops/sec ±0.51% (98 runs sampled)
nyxjson x 405,848 ops/sec ±0.56% (100 runs sampled)
nyxjson (strict) x 409,514 ops/sec ±0.57% (101 runs sampled)
sjson (try-catch) x 435,406 ops/sec ±0.41% (100 runs sampled)
@hapi/bourne x 467,163 ops/sec ±0.42% (99 runs sampled)
Fastest is JSON.parse (try-catch)
```

## License

MIT. Made with 💞

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nyxjson?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/nyxjson
[npm-downloads-src]: https://img.shields.io/npm/dm/nyxjson?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/nyxjson
[bundle-src]: https://img.shields.io/bundlephobia/minzip/nyxjson?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=nyxjson

