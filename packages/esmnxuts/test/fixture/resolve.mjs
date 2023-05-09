import { consolji } from 'consolji'
import { createResolve, resolveImports, resolvePath } from 'esmnxuts'

const resolve = createResolve({ url: import.meta.url })
consolji.log(await resolve('./cjs.mjs'))

consolji.log(await resolvePath('./cjs.mjs', { url: import.meta.url }))
consolji.log(await resolvePath('./foo', { url: import.meta.url }))

consolji.log(
   await resolveImports('import foo from \'./eval.mjs\'', { url: import.meta.url }),
)
