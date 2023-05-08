#!deno run
import { consolji } from 'consolji'
import nyxjson from 'https://deno.land/x/nyxjson/src/index.ts'

consolji.log(nyxjson('{ "deno": "yay" }'))
