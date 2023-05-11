[![cover][cover-src]][cover-href]
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

> Assign default properties, recursively 🔄. Lightweight and Fast 💨.
## Install

Install package:

```bash
# nyxi
nyxi nyxdefaults

# pnpm
pnpm add nyxdefaults

# npm
npm i nyxdefaults

# yarn
yarn add nyxdefaults
```

## Usage

```ts
import { nyxdefaults } from 'nyxdefaults'

const options = nyxdefaults(object, ...defaults)
```

Leftmost arguments have more priority when assigning defaults.

### Arguments

- **object (Object):** The destination object.
- **source (Object):** The source object.

```ts
import { nyxdefaults } from 'nyxdefaults'

console.log(nyxdefaults({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } }))
// => { a: { b: 2, c: 3 } }
```

### Using with CommonJS

```ts
const { nyxdefaults } = require('nyxdefaults')
```

## Custom Merger

Sometimes default merging strategy is not desirable. Using `createNyxdefaults` we can create a custom instance with different merging strategy.

This function accepts `obj` (source object), `key` and `value` (current value) and should return `true` if applied custom merging.

**Example:** Sum numbers instead of overriding

```js
import { createNyxdefaults } from 'nyxdefaults'

const ext = createDefu((obj, key, value) => {
  if (typeof obj[key] === 'number' && typeof value === 'number') {
    obj[key] += val
    return true
  }
})

ext({ cost: 15 }, { cost: 10 }) // { cost: 25 }
```

## Function Merger

Using `nyxdefaultsFn`, if user provided a function, it will be called with default value instead of merging.

I can be useful for default values manipulation.

**Example:** Filter some items from defaults (array) and add 20 to the count default value.

```ts
import { nyxdefaultsArrayFn } from 'nyxdefaults';

nyxdefaultsArrayFn({
  ignore: val => val.filter(i => i !== 'dist'),
  count: () => 20
}, {
  ignore: [
    'node_modules',
    'dist'
  ],
  count: 10
});
 /*
 {
    ignore: ['node_modules'],
    count: 30
  }
  */
```

**Note:** if the default value is not defined, the function defined won't be called and kept as value.

## Array Function Merger

`nyxdefaultsArrayFn` is similar to `nyxdefaultsFn` but **only applies to array values defined in defaults**.

**Example:** Filter some items from defaults (array) and add 20 to the count default value.

```js
import { nyxdefaultsArrayFn } from 'nyxdefaults'

nyxdefaultsArrayFn({
  ignore(val) => val.filter(i => i !== 'dist'),
  count: () => 20
 }, {
   ignore: [
     'node_modules',
     'dist'
   ],
   count: 10
 })
 /*
  {
    ignore: ['node_modules'],
    count: () => 20
  }
  */
```

**Note:** the function is called only if the value defined in defaults is an aray.

### Remarks

- `object` and `defaults` are not modified
- Nullish values ([`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null) and [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)) are skipped. Please use [defaults-deep](https://www.npmjs.com/package/defaults-deep) or [omit-deep](http://npmjs.com/package/omit-deep) or [lodash.defaultsdeep](https://www.npmjs.com/package/lodash.defaultsdeep) if you need to preserve or different behavior.
- Assignment of `__proto__` and `constructor` keys will be skipped to prevent security issues with object pollution.
- Will concat `array` values (if default property is defined)
```ts
console.log(nyxdefaults({ array: ['b', 'c'] }, { array: ['a'] }))
// => { array: ['a', 'b', 'c']}
```

## Type

We expose `Nyxdefaults` as a type utility to return a merged type that follows the rules that nyxdefaults follows.

```ts
import type { Nyxdefaults } from 'nyxdefaults'

type Options = Nyxdefaults<{ foo: 'bar' }, [{}, { bar: 'baz' }, { something: 42 }]>
// returns { foo: 'bar', bar: 'baz', 'something': 42 }
```

## License

MIT. Made with 💞

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nyxdefaults?style=flat&colorA=18181B&colorB=14F195
[npm-version-href]: https://npmjs.com/package/nyxdefaults
[npm-downloads-src]: https://img.shields.io/npm/dm/nyxdefaults?style=flat&colorA=18181B&colorB=14F195
[npm-downloads-href]: https://npmjs.com/package/nyxdefaults
[bundle-src]: https://img.shields.io/bundlephobia/minzip/nyxdefaults?style=flat&colorA=18181B&colorB=14F195
[bundle-href]: https://bundlephobia.com/result?p=nyxdefaults
[license-src]: https://img.shields.io/github/license/nyxblabs/CodeBoost.svg?style=flat&colorA=18181B&colorB=14F195
[license-href]: https://github.com/nyxblabs/CodeBoost/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsDocs.io-reference-18181B?style=flat&colorA=18181B&colorB=14F195
[jsdocs-href]: https://www.jsdocs.io/package/nyxdefaults

<!-- Covers -->
[cover-src]: https://raw.githubusercontent.com/nyxblabs/utilities/main/.github/assets/cover-github-nyxdefaults.png
[cover-href]: https://💻nyxb.ws
