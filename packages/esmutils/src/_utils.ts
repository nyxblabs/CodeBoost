import { builtinModules } from 'node:module'

export const BUILTIN_MODULES = new Set(builtinModules)

export function normalizeSlash(string_: string): string {
   return string_.replace(/\\/g, '/')
}

export function pcall(function_: Function, ...arguments_: any[]) {
   try {
      return Promise.resolve(function_(...arguments_)).catch(error => perr(error))
   }
   catch (error) {
      return perr(error)
   }
}

class CustomError extends Error {
   code: string | undefined

   constructor(_error: any) {
      super(_error.message)
      this.code = _error.code
      Error.captureStackTrace(this, pcall)
   }
}

export function perr(_error: any): Promise<never> {
   const error = new CustomError(_error)
   return Promise.reject(error)
}

export function isObject(value: any): boolean {
   return value !== null && typeof value === 'object'
}

export function matchAll(regex: RegExp, string: string, addition: object): object[] {
   const matches = []
   for (const match of string.matchAll(regex)) {
      matches.push({
         ...addition,
         ...match.groups,
         code: match[0],
         start: match.index,
         end: match.index! + match[0].length,
      })
   }
   return matches
}
