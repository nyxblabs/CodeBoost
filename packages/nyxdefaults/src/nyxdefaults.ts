import type { Merger, NyxdefaultsFn as NyxdefaultsFunction, NyxdefaultsInstance } from './types'

function isObject(value: any) {
   return value !== null && typeof value === 'object'
}

// Base function to apply defaults
function _nyxdefaults<T>(
   baseObject: T,
   defaults: any,
   namespace = '.',
   merger?: Merger,
): T {
   if (!isObject(defaults))
      return _nyxdefaults(baseObject, {}, namespace, merger)

   const object = Object.assign({}, defaults)

   for (const key in baseObject) {
      if (key === '__proto__' || key === 'constructor')
         continue

      const value = baseObject[key]

      if (value === null || value === undefined)
         continue

      if (merger && merger(object, key, value, namespace))
         continue

      if (Array.isArray(value) && Array.isArray(object[key])) {
         object[key] = [...value, ...object[key]]
      }
      else if (isObject(value) && isObject(object[key])) {
         object[key] = _nyxdefaults(
            value,
            object[key],
            (namespace ? `${namespace}.` : '') + key.toString(),
            merger,
         )
      }
      else {
         object[key] = value
      }
   }

   return object
}

// Create nyxdefaults wrapper with optional merger and multi arg support
export function createNyxdefaults(merger?: Merger): NyxdefaultsFunction {
   return (...arguments_) =>

      arguments_.reduce((p, c) => _nyxdefaults(p, c, '', merger), {} as any)
}

// Standard version
export const nyxdefaults = createNyxdefaults() as NyxdefaultsInstance
export default nyxdefaults

// Custom version with function merge support
export const nyxdefaultsFn = createNyxdefaults((object, key, currentValue) => {
   if (
      typeof object[key] !== 'undefined'
    && typeof currentValue === 'function'
   ) {
      object[key] = currentValue(object[key])
      return true
   }
})

// Custom version with function merge support only for defined arrays
export const nyxdefaultsArrayFn = createNyxdefaults((object, key, currentValue) => {
   if (Array.isArray(object[key]) && typeof currentValue === 'function') {
      object[key] = currentValue(object[key])
      return true
   }
})

export type { Nyxdefaults } from './types'
