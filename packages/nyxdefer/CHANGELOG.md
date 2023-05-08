# Changelog


## v0.0.3...main

[compare changes](https://exaple.com.git//compare/v0.0.3...main)


### 🚀 Enhancements

  - **nyxdefer:** Add package.json and tsconfig.json files The package.json file contains metadata about the package, including its name, version, description, author, license, homepage, repository, bugs, bin, sideEffects, type, main, module, types, exports, scripts, dependencies, devDependencies, files, and keywords. The tsconfig.json file contains the TypeScript compiler options, including the root directory and the files to include. These files are necessary for the package to be published and used as a dependency in other projects. (2a0548a)
  - **nyxdefer:** Add nyxdefer function to debounce async functions The nyxdefer function is a utility function that can be used to debounce async functions. It takes in a function and a wait time in milliseconds and returns a new function that delays calling the original function until after the wait time has elapsed since the last time it was called. The function also has options to call the function on the leading edge of the timeout and to call the function on the trailing edge with the last used arguments. The function is useful for optimizing performance by reducing the number of times a function is called. (74d3bb9)
  - **nyxdefer): add nyxdefer package with tests ✨ feat(nyxdefer:** Add MIT license The nyxdefer package has been added, which provides a function that returns a debounced version of the input function. The package includes tests for the nyxdefer function, which test its functionality in various scenarios. Additionally, an MIT license has been added to the package. (b805496)

### 🏡 Chore

  - **nyxdefer): add .eslintignore file to ignore dist and node_modules directories 🚚 refactor(nyxdefer): remove unused bin property from package.json 👤 chore(nyxdefer): add author field to package.json 🔧 chore(nyxdefer): add lint and lint:fix scripts to package.json 🚀 chore(nyxdefer): add release script to package.json 🔬 test(nyxdefer:** Add test script to package.json The .eslintignore file was added to ignore the dist and node_modules directories. The bin property was removed from package.json as it was unused. The author field was added to package.json to provide information about the package author. The lint and lint:fix scripts were added to package.json to enable linting of the codebase. The release script was added to package.json to automate the release process. The test script was added to package.json to enable testing of the codebase (a5da446)

### ❤️  Contributors

- Nyxb <contact@nyxb.xyz>

