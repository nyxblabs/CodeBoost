<p align="center">
<img src="https://raw.githubusercontent.com/nyxblabs/utilities/main/.github/assets/cover-nyxjson_light.png#gh-light-mode-only">
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
// ESM
import nyxjson from 'nyxjson'

const nyxjson = require('nyxjson')
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
JSON.parse x 5,055,133 ops/sec ±1.49% (89 runs sampled)
nyxjson x 692,414,582 ops/sec ±4.13% (76 runs sampled)
nyxjson (strict) x 798,944,227 ops/sec ±3.01% (86 runs sampled)
sjson:
@hapi/bourne x 4,401,788 ops/sec ±4.41% (79 runs sampled)
Fastest is nyxjson (strict)

=== Known values ==
JSON.parse x 8,512,228 ops/sec ±4.18% (77 runs sampled)
nyxjson x 48,124,313 ops/sec ±4.65% (75 runs sampled)
nyxjson (strict) x 48,440,989 ops/sec ±5.44% (76 runs sampled)
sjson x 6,990,805 ops/sec ±4.13% (78 runs sampled)
@hapi/bourne x 7,895,428 ops/sec ±4.63% (77 runs sampled)
Fastest is nyxjson,nyxjson (strict)

=== Plain string ==
JSON.parse (try-catch) x 64,066 ops/sec ±5.03% (73 runs sampled)
nyxjson x 22,319,224 ops/sec ±5.21% (75 runs sampled)
nyxjson (strict):
sjson (try-catch) x 95,467 ops/sec ±5.90% (69 runs sampled)
@hapi/bourne:
Fastest is nyxjson

=== standard object ==
JSON.parse x 166,726 ops/sec ±4.17% (77 runs sampled)
nyxjson x 117,596 ops/sec ±4.24% (75 runs sampled)
nyxjson (strict) x 117,769 ops/sec ±4.55% (75 runs sampled)
sjson x 150,480 ops/sec ±4.14% (75 runs sampled)
@hapi/bourne x 152,122 ops/sec ±5.23% (72 runs sampled)
Fastest is JSON.parse

=== invalid syntax ==
JSON.parse (try-catch) x 166,171 ops/sec ±5.16% (74 runs sampled)
nyxjson x 106,112 ops/sec ±6.03% (71 runs sampled)
nyxjson (strict) x 123,743 ops/sec ±4.14% (79 runs sampled)
sjson (try-catch) x 147,030 ops/sec ±5.21% (78 runs sampled)
@hapi/bourne x 158,574 ops/sec ±4.31% (75 runs sampled)
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

