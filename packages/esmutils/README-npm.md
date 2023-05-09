<p align="center">
<img src="https://raw.githubusercontent.com/nyxblabs/utilities/main/.github/assets/cover-esmutils_light.png#gh-light-mode-only">
</p>

> Missing [ECMAScript module](https://nodejs.org/api/esm.html) utils for Node.js
>
> 📈 As the Node.js ecosystem continues to embrace ESM modules, many essential features are still in development, experimental, or not yet available. 💡 This package aims to address these gaps and provide the necessary support for ESM modules. 🔌 Enhance your Node.js development experience with features that are required for optimal ESM support. 🚀 Stay ahead of the curve with this package.

## Usage

Install:

```sh
# nyxi
nyxi esmutils

#pnpm
pnpm add esmutils

# using npm
npm install esmutils

# using yarn
yarn add esmutils
```

**Note:** Node.js 14+ is recommended.

Import utils:

```ts
// ESM
import {} from 'esmutils'

// CommonJS
const {} = require('esmutils')
```

## Resolving ESM modules

Several utilities to make ESM resolution easier:

- Respecting [ECMAScript Resolver algorithm](https://nodejs.org/dist/latest-v14.x/docs/api/esm.html#esm_resolver_algorithm)
- Exposed from Node.js implementation
- Windows paths normalized
- Supporting custom `extensions` and `/index` resolution
- Supporting custom `conditions`
- Support resolving from multiple paths or urls

### `resolve`

Resolve a module by respecting [ECMAScript Resolver algorithm](https://nodejs.org/dist/latest-v14.x/docs/api/esm.html#esm_resolver_algorithm)
(using [wooorm/import-meta-resolve](https://github.com/wooorm/import-meta-resolve)).

Additionally supports resolving without extension and `/index` similar to CommonJS.

```js
import { resolve } from 'esmutils'

// file:///home/user/project/module.mjs
console.log(await resolve('./module.mjs', { url: import.meta.url }))
```

**Resolve options:**

- `url`: URL or string to resolve from (default is `pwd()`)
- `conditions`: Array of conditions used for resolution algorithm (default is `['node', 'import']`)
- `extensions`: Array of additional extensions to check if import failed (default is `['.mjs', '.cjs', '.js', '.json']`)

### `resolvePath`

Similar to `resolve` but returns a path instead of URL using `fileURLToPath`.

```ts
import { resolvePath } from 'esmutils'

// /home/user/project/module.mjs
console.log(await resolvePath('./module.mjs', { url: import.meta.url }))
```

### `createResolve`

Create a `resolve` function with defaults.

```ts
import { createResolve } from 'esmutils'

const _resolve = createResolve({ url: import.meta.url })

// file:///home/user/project/module.mjs
console.log(await _resolve('./module.mjs'))
```

**Example:** Ponyfill [import.meta.resolve](https://nodejs.org/api/esm.html#esm_import_meta_resolve_specifier_parent):

```ts
import { createResolve } from 'esmutils'

import.meta.resolve = createResolve({ url: import.meta.url })
```

### `resolveImports`

Resolve all static and dynamic imports with relative paths to full resolved path.

```ts
import { resolveImports } from 'esmutils'

// import foo from 'file:///home/user/project/bar.mjs'
console.log(
   await resolveImports('import foo from \'./bar.mjs\'', { url: import.meta.url })
)
```

## Syntax Analyzes

### `isValidNodeImport`

Using various syntax detection and heuristics, this method can determine if import is a valid import or not to be imported using dynamic `import()` before hitting an error!

When result is `false`, we usually need a to create a CommonJS require context or add specific rules to the bundler to transform dependency.

```ts
import { isValidNodeImport } from 'esmutils'

// If returns true, we are safe to use `import('some-lib')`
await isValidNodeImport('some-lib', {})
```

**Algorithm:**

- Check import protocol - If is `data:` return `true` (✅ valid) - If is not `node:`, `file:` or `data:`, return `false` (
  ❌ invalid)
- Resolve full path of import using Node.js [Resolution algorithm](https://nodejs.org/api/esm.html#resolution-algorithm)
- Check full path extension
  - If is `.mjs`, `.cjs`, `.node` or `.wasm`, return `true` (✅ valid)
  - If is not `.js`, return `false` (❌ invalid)
  - If is matching known mixed syntax (`.esm.js`, `.es.js`, etc) return `false` (
    ❌ invalid)
- Read closest `package.json` file to resolve path
- If `type: 'module'` field is set, return `true` (✅ valid)
- Read source code of resolved path
- Try to detect CommonJS syntax usage
  - If yes, return `true` (✅ valid)
- Try to detect ESM syntax usage
  - if yes, return `false` (
    ❌ invalid)

**Notes:**

- There might be still edge cases algorithm cannot cover. It is designed with best-efforts.
- This method also allows using dynamic import of CommonJS libraries considering
  Node.js has [Interoperability with CommonJS](https://nodejs.org/api/esm.html#interoperability-with-commonjs).

### `hasESMSyntax`

Detect if code, has usage of ESM syntax (Static `import`, ESM `export` and `import.meta` usage)

```ts
import { hasESMSyntax } from 'esmutils'

hasESMSyntax('export default foo = 123') // true
```

### `hasCJSSyntax`

Detect if code, has usage of CommonJS syntax (`exports`, `module.exports`, `require` and `global` usage)

```ts
import { hasCJSSyntax } from 'esmutils'

hasCJSSyntax('export default foo = 123') // false
```

### `detectSyntax`

Tests code against both CJS and ESM.

`isMixed` indicates if both are detected! This is a common case with legacy packages exporting semi-compatible ESM syntax meant to be used by bundlers.

```ts
import { detectSyntax } from 'esmutils'

// { hasESM: true, hasCJS: true, isMixed: true }
detectSyntax('export default require("lodash")')
```

## CommonJS Context

### `createCommonJS`

This utility creates a compatible CommonJS context that is missing in ECMAScript modules.

```ts
import { createCommonJS } from 'esmutils'

const { __dirname, __filename, require } = createCommonJS(import.meta.url)
```

Note: `require` and `require.resolve` implementation are lazy functions. [`createRequire`](https://nodejs.org/api/module.html#module_module_createrequire_filename) will be called on first usage.

## Import/Export Analyzes

Tools to quickly analyze ESM syntax and extract static `import`/`export`

- Super fast Regex based implementation
- Handle most edge cases
- Find all static ESM imports
- Find all dynamic ESM imports
- Parse static import statement
- Find all named, declared and default exports

### `findStaticImports`

Find all static ESM imports.

Example:

```ts
import { findStaticImports } from 'esmutils'

console.log(
   findStaticImports(`
// Empty line
import foo, { bar /* foo */ } from 'baz'
`)
)
```

Outputs:

```ts
[
   {
      type: 'static',
      imports: 'foo, { bar /* foo */ } ',
      specifier: 'baz',
      code: 'import foo, { bar /* foo */ } from \'baz\'',
      start: 15,
      end: 55,
   },
]
```

### `parseStaticImport`

Parse a dynamic ESM import statement previously matched by `findStaticImports`.

Example:

```ts
import { findStaticImports, parseStaticImport } from 'esmutils'

const [match0] = findStaticImports('import baz, { x, y as z } from \'baz\'')
console.log(parseStaticImport(match0))
```

Outputs:

```ts
{
  type: 'static',
  imports: 'baz, { x, y as z } ',
  specifier: 'baz',
  code: "import baz, { x, y as z } from 'baz'",
  start: 0,
  end: 36,
  defaultImport: 'baz',
  namespacedImport: undefined,
  namedImports: { x: 'x', y: 'z' }
}
```

### `findDynamicImports`

Find all dynamic ESM imports.

Example:

```ts
import { findDynamicImports } from 'esmutils'

console.log(
   findDynamicImports(`
const foo = await import('bar')
`)
)
```

### `findExports`

```ts
import { findExports } from 'esmutils'

console.log(
   findExports(`
export const foo = 'bar'
export { bar, baz }
export default something
`)
)
```

Outputs:

```ts
[
   {
      type: 'declaration',
      declaration: 'const',
      name: 'foo',
      code: 'export const foo',
      start: 1,
      end: 17,
   },
   {
      type: 'named',
      exports: ' bar, baz ',
      code: 'export { bar, baz }',
      start: 26,
      end: 45,
      names: ['bar', 'baz'],
   },
   { type: 'default', code: 'export default ', start: 46, end: 61 },
]
```

### `findExportNames`

Same as `findExports` but returns array of export names.

```ts
import { findExportNames } from 'esmutils'

// [ "foo", "bar", "baz", "default" ]
console.log(
   findExportNames(`
export const foo = 'bar'
export { bar, baz }
export default something
`)
)
```

## `resolveModuleExportNames`

Resolves module and reads its contents to extract possible export names using static analyzes.

```ts
import { resolveModuleExportNames } from 'esmutils'

// ["basename", "dirname", ... ]
console.log(await resolveModuleExportNames('nyxpath'))
```

## Evaluating Modules

Set of utilities to evaluate ESM modules using `data:` imports

- Automatic import rewrite to resolved path using static analyzes
- Allow bypass ESM Cache
- Stack-trace support
- `.json` loader

### `evalModule`

Transform and evaluates module code using dynamic imports.

```ts
import { evalModule } from 'esmutils'

await evalModule('console.log("Hello World!")')

await evalModule(
  `
  import { reverse } from './utils.mjs'
  console.log(reverse('!emosewa si sj'))
`,
  { url: import.meta.url }
)
```

**Options:**

- all `resolve` options
- `url`: File URL

### `loadModule`

Dynamically loads a module by evaluating source code.

```ts
import { loadModule } from 'esmutils'

await loadModule('./hello.mjs', { url: import.meta.url })
```

Options are same as `evalModule`.

### `transformModule`

- Resolves all relative imports will be resolved
- All usages of `import.meta.url` will be replaced with `url` or `from` option

```ts
import { transformModule } from 'esmutils'

console.log(transformModule('console.log(import.meta.url)'), {
   url: 'test.mjs',
})
```

Options are same as `evalModule`.

## Other Utils

### `fileURLToPath`

Similar to [url.fileURLToPath](https://nodejs.org/api/url.html#url_url_fileurltopath_url) but also converts windows backslash `\` to unix slash `/` and handles if input is already a path.

```ts
import { fileURLToPath } from 'esmutils'

// /foo/bar.js
console.log(fileURLToPath('file:///foo/bar.js'))

// C:/path
console.log(fileURLToPath('file:///C:/path/'))
```

### `normalizeid`

Ensures id has either of `node:`, `data:`, `http:`, `https:` or `file:` protocols.

```ts
import { ensureProtocol } from 'esmutils'

// file:///foo/bar.js
console.log(normalizeid('/foo/bar.js'))
```

### `loadURL`

Read source contents of a URL. (currently only file protocol supported)

```ts
import { loadURL, resolve } from 'esmutils'

const url = await resolve('./index.mjs', { url: import.meta.url })
console.log(await loadURL(url))
```

### `toDataURL`

Convert code to [`data:`](https://nodejs.org/api/esm.html#esm_data_imports) URL using base64 encoding.

```ts
import { toDataURL } from 'esmutils'

console.log(
   toDataURL(`
  // This is an example
  console.log('Hello world')
`)
)
```

### `interopDefault`

Return the default export of a module at the top-level, alongside any other named exports.

```ts
// Assuming the shape { default: { foo: 'bar' }, baz: 'qux' }
import myModule from 'my-module'

// Returns { foo: 'bar', baz: 'qux' }
console.log(interopDefault(myModule))
```

### `sanitizeURIComponent`

Replace reserved characters from a segment of URI to make it compatible with [rfc2396](https://datatracker.ietf.org/doc/html/rfc2396).

```ts
import { sanitizeURIComponent } from 'esmutils'

// foo_bar
console.log(sanitizeURIComponent('foo:bar'))
```

### `sanitizeFilePath`

Sanitize each path of a file name or path with `sanitizeURIComponent` for URI compatibility.

```ts
import { sanitizeFilePath } from 'esmutils'

// C:/te_st/_...slug_.jsx'
console.log(sanitizeFilePath('C:\\te#st\\[...slug].jsx'))
```

## License

[MIT](./LICENSE) - Made with 💞
