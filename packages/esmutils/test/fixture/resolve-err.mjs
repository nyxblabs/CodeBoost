import { consolji } from 'consolji'
import { resolve } from 'esmutils'

consolji.log(await resolve('./404.mjs'))
