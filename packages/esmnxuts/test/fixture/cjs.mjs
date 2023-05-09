import { consolji } from 'consolji'
import { createCommonJS } from 'esmnxuts'

const cjs = createCommonJS(import.meta.url)

consolji.log(cjs)
consolji.log(cjs.require.resolve('../../package.json'))
