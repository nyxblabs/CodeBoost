# CodeBoost 🚀💻💪

CodeBoost is a powerful monorepo of Node.js tools and libraries designed to boost developer productivity and code quality. It contains several packages, each providing different features, such as an improved debounce function with promise support, a lightning-fast hashing library, and much more!

<h2 style="color:#9945FF;">📦 Packages</h2>

<h3 style="color:#14F195;">📦nyxdefaults</h3>

Assign default properties recursively and lightning-fast! This package provides a highly efficient way for developers to set default values for objects.
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

<h3 style="color:#14F195;">📦nyxdefer</h3>

An improved debounce function with Promise support that is well-tested and highly configurable. Avoid duplicate function calls while promise is being resolved.
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

<h3 style="color:#14F195;">📦nyxhash</h3>

A super-fast hashing library built specifically for Node.js development environments. It provides a fast hashing function that's particularly useful for processing large amounts of data.
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

<h3 style="color:#14F195;">📦nyxpath</h3>

This package provides identical exports to Node.js's built-in path module but with normalization on all operations and written in modern ESM/Typescript. Plus, it has no dependency on Node.js! Mind-blowing, right?
<details>
<summary><strong>Info:</strong></summary>
Have you ever wondered why the path separators for Windows and macOS, Linux, and other Posix operating systems are different? It turns out that for 🕰️ historical reasons, Windows chose to use backslashes `\` for separating paths instead of the slash `/` used by other operating systems. Nowadays, [Windows](https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file?redirectedfrom=MSDN) supports both slashes and backslashes for paths, but this can lead to inconsistent code behavior. When running on a Windows operating system, Node.js's built-in [path module](https://nodejs.org/api/path.html) assumes that Windows-style paths are being used, which makes for inconsistent code behavior between Windows and POSIX.

👉 This is where nyxpath comes in! It provides **identical exports** to Node.js's built-in path module, but with normalization on **all operations** and written in modern **ESM/Typescript**. Plus, it has **no dependency on Node.js**! 🤯
<br>
Learn more in the <a href="https://github.com/nyxblabs/CodeBoost/blob/main/packages/nyxpath/README.md">README</a> file.
</details>

<h3 style="color:#14F195;">📦fetch-for-all</h3>

A redistribution of node-fetch v3 for better backward and forward compatibility. It supports native global support and offers a compact build with zero dependencies. It can also support both CommonJS (require) and ESM (import) usage.

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
