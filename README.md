[![cover][cover-src]][cover-href]
# CodeBoost 🚀💻💪

🚀 CodeBoost is a comprehensive monorepo of Node.js tools and libraries designed to enhance developer productivity and code quality. It offers a suite of packages, including a fast hashing library, an improved debounce function with promise support, and much more! 💻 Boost your Node.js development experience with CodeBoost's powerful features and improve your coding efficiency. 🧰 Choose from a variety of packages that best fit your needs and start coding smarter today!

<h2 style="color:#9945FF;">📦 Packages</h2>

### [📦 nyxdefaults](https://github.com/nyxblabs/CodeBoost/tree/main/packages/nyxdefaults)

🔧 This package offers lightning-fast default property assignment for objects, providing an efficient solution for developers. 💡 Simplify your code and save time with its recursive property assignment feature.
<details>
<summary><strong>Example:</strong></summary>

Filter some items from defaults (array) and add 20 to the count default value.

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
<br>
Learn more in the <a href="https://github.com/nyxblabs/CodeBoost/blob/main/packages/nyxdefaults/README.md">README</a> file.
</details>

### [📦 nyxdefer](https://github.com/nyxblabs/CodeBoost/tree/main/packages/nyxdefer)

🔄 Avoid duplicate function calls and improve performance with this highly configurable debounce function that also supports Promises. 💡 With well-tested functionality, you can trust that your function will only be called once while the Promise is being resolved.
<details>
<summary><strong>Example:</strong></summary>

When calling `nyxdefered`, it will wait at least for `25ms` as configured before actually calling our function. This helps to avoid multiple calls.

To avoid initial wait, we can set `leading: true` option. It will cause function to be immediately called if there is no other call:

```js
const nyxdeferred = debounce(async () => {
   // Some heavy stuff
}, 25, { leading: true })
```
<br>
Learn more in the <a href="https://github.com/nyxblabs/CodeBoost/blob/main/packages/nyxdefer/README.md">README</a> file.
</details>

### [📦 nyxhash](https://github.com/nyxblabs/CodeBoost/tree/main/packages/nyxhash)

🔒 This package provides a super-fast hashing library optimized for Node.js environments. 💨 With its high-speed hashing function, it's perfect for processing large data sets efficiently.
<details>
<summary><strong>Example:</strong></summary>
Converts object value into a string hash using `objectHash` and then applies `sha256` with Base64 encoding (trimmed by length of 10).

Usage:

```ts
import { hash } from 'nyxhash'

// "dZbtA7f0lK"
console.log(hash({ foo: 'bar' }))
```
<br>
Learn more in the <a href="https://github.com/nyxblabs/CodeBoost/blob/main/packages/nyxhash/README.md">README</a> file.
</details>

### [📦 nyxpath](https://github.com/nyxblabs/CodeBoost/tree/main/packages/nyxpath)

🔗 This package offers identical exports to Node.js's built-in path module, but with normalization on all operations and written in modern ESM/Typescript. 🌟 Plus, it has no dependency on Node.js! 🤯 Mind-blowing, right?
<details>
<summary><strong>Info:</strong></summary>
Have you ever wondered why the path separators for Windows and macOS, Linux, and other Posix operating systems are different? It turns out that for 🕰️ historical reasons, Windows chose to use backslashes `\` for separating paths instead of the slash `/` used by other operating systems. Nowadays, [Windows](https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file?redirectedfrom=MSDN) supports both slashes and backslashes for paths, but this can lead to inconsistent code behavior. When running on a Windows operating system, Node.js's built-in [path module](https://nodejs.org/api/path.html) assumes that Windows-style paths are being used, which makes for inconsistent code behavior between Windows and POSIX.

👉 This is where nyxpath comes in! It provides **identical exports** to Node.js's built-in path module, but with normalization on **all operations** and written in modern **ESM/Typescript**. Plus, it has **no dependency on Node.js**! 🤯
<br>
Learn more in the <a href="https://github.com/nyxblabs/CodeBoost/blob/main/packages/nyxpath/README.md">README</a> file.
</details>

### [📦 fetch-for-all](https://github.com/nyxblabs/CodeBoost/tree/main/packages/fetch-for-all)

🔄 A redistribution of node-fetch v3 for better backward and forward compatibility. 🔋 It supports native global support and offers a compact build with zero dependencies. 💻📦 It can also support both CommonJS (require) and ESM (import) usage.
<details>
<summary><strong>Example:</strong></summary>
More named exports:

```ts
// ESM
import { fetch, Blob, FormData, Headers, Request, Response, AbortController } from 'fetch-for-all'

// CommonJS
const { fetch, Blob, FormData, Headers, Request, Response, AbortController } = require('fetch-for-all')
```
<br>
Learn more in the <a href="https://github.com/nyxblabs/CodeBoost/blob/main/packages/fetch-for-all/README.md">README</a> file.
</details>

### [📦 nyxjson](https://github.com/nyxblabs/CodeBoost/tree/main/packages/nyxjson)

📈 This package fills the gaps in essential ESM module features for Node.js. 💡 Enhance your Node.js development with optimal ESM support. 🔌 Lightning-fast default property assignment for objects. 🚀 Stay ahead of the curve with this package.
<details>
<summary><strong>Example:</strong></summary>
More named exports:

```ts
**Fast fallback to input if is not string:**

```ts
// Uncaught SyntaxError: Unexpected token u in JSON at position 0
JSON.parse()

// undefined
nyxjson()
```
<br>
Learn more in the <a href="https://github.com/nyxblabs/CodeBoost/blob/main/packages/nyxjson/README.md">README</a> file.
</details>

### [📦 url-ops](https://github.com/nyxblabs/CodeBoost/tree/main/packages/url-ops)

🔗🚀 Powerful URL operations for Node.js with url-ops. Simplify your URL manipulation with a collection of functions that ensures properly encoded and consistent URLs. Normalize, resolve, and parse URLs with ease.
<details>
<summary><strong>Example:</strong></summary>

### `normalizeURL`

- Ensures URL is properly encoded
- Ensures pathname starts with slash
- Preserves protocol/host if provided

```ts
normalizeURL('test?query=123 123#hash, test')
// test?query=123%20123#hash,%20test

normalizeURL('http://localhost:3000')
// http://localhost:3000/
```

### `joinURL`

```ts
joinURL('a', '/b', '/c')
// a/b/c
```
<br>
Learn more in the <a href="https://github.com/nyxblabs/CodeBoost/blob/main/packages/url-ops/README.md">README</a> file.
</details>

### [📦 evizor](https://github.com/nyxblabs/CodeBoost/tree/main/packages/envizor)

🔍🌍 Discover the perfect JavaScript environment with Enenvizor! This powerful package offers lightning-fast detection of the current environment with incredible accuracy. 🕵️‍♂️ Easily tailor your code to the right environment and avoid compatibility issues with the advanced detection capabilities of Enenvizor. 💪🏼 Take your development to the next level and ensure optimal performance with Enenvizor!
<details>
<summary><strong>Example:</strong></summary>

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
<br>
Learn more in the <a href="https://github.com/nyxblabs/CodeBoost/blob/main/packages/envizor/README.md">README</a> file.
</details>

### [📦 requireflow](https://github.com/nyxblabs/CodeBoost/tree/main/packages/requireflow)

🔌👨‍💻 Polyfill Node.js `module.createRequire` with ease using Requireflow! Ensure your code is fully supported across different Node.js versions and upgrade your development experience. 🚀
<details>
<summary><strong>Example:</strong></summary>

## Usage

```ts
function createRequire(filename: string | URL): NodeRequire
```

```ts
const createRequire = require('requireflow')

const myRequire = createRequire('path/to/test.js')
const myModule = myRequire('./test-sibling-module')
```

<br>
Learn more in the <a href="https://github.com/nyxblabs/CodeBoost/blob/main/packages/requireflow/README.md">README</a> file.
</details>

## 🚀 Installation

You can install CodeBoost packages via NPM by running the following command:

```bash
npm i <package-name>
```

Replace `<package-name>` with the name of the desired package.

## 💻 Usage

Each package in CodeBoost is designed specifically for use in Node.js development environments and offers comprehensive documentation detailing how to use each function and method. You can find the documentation on each package's README.md.

## 🤝 Contributing

We welcome contributions from developers to help improve CodeBoost. If you find a bug or want to add a feature, feel free to create a pull request on Github.
> check out our [contributing guide](https://github.com/nyxb/contribute) for more information.

## 📄 License

CodeBoost is released under the MIT License. For more information, see the [LICENSE](./LICENSE) file.

<!-- Covers -->
[cover-src]: https://raw.githubusercontent.com/nyxblabs/utilities/main/.github/assets/cover-github-codeboost.png
[cover-href]: https://💻nyxb.ws
