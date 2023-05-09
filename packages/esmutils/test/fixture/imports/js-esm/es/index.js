const { consolji } = require('consolji')

// @ts-expect-error is fine
consolji.log(await Promise.resolve('foo'))
