export interface NyxdeferOptions {
   /**
  Call the `fn` on the [leading edge of the timeout](https://css-tricks.com/debouncing-throttling-explained-examples/#article-header-id-1).
  Meaning immediately, instead of waiting for `wait` milliseconds.
  @default false
  */
   readonly leading?: boolean

   /**
  Call the `fn` on trailing edge with last used arguments. Result of call is from previous call.
  @default false
  */
   readonly trailing?: boolean
}

const NYXDEFER_DEFAULTS: NyxdeferOptions = {
   trailing: true,
}

/**
Nyxdefer functions
@param fn - Promise-returning/async function to debounce.
@param wait - Milliseconds to wait before calling `fn`. Default value is 25ms
@returns A function that delays calling `fn` until after `wait` milliseconds have elapsed since the last time it was called.
@example
import { nyxdefer } from 'nyxdefer'const expensiveCall = async input => input;
const nyxdeferredFn = nyxdefer(expensiveCall, 200);
for (const number of [1, 2, 3]) {
console.log(await nyxdeferredFn(number));
}
//=> 3
//=> 3
//=> 3
*/
export function nyxdefer<ArgumentsT extends unknown[], ReturnT>(
   fn: (...args: ArgumentsT) => PromiseLike<ReturnT> | ReturnT,
   wait = 25,
   options: NyxdeferOptions = {},
) {
   // Validate options
   options = { ...NYXDEFER_DEFAULTS, ...options }
   if (!Number.isFinite(wait))
      throw new TypeError('Expected `wait` to be a finite number')

   // Last result for leading value
   let leadingValue: PromiseLike<ReturnT> | ReturnT

   // Nyxdefer timeout handle
   let timeout: NodeJS.Timeout

   // Promises to be resolved when nyxdefer if finished
   let resolveList: Array<(val: unknown) => void> = []

   // Keep state of currently resolving promise
   let currentPromise: Promise<ReturnT>

   // Trailing call info
   let trailingArgs: any[]

   const applyFn = (context, args) => {
      currentPromise = _applyPromised(fn, context, args)
      currentPromise.finally(() => {
         currentPromise = null
         if (options.trailing && trailingArgs && !timeout) {
            const promise = applyFn(context, trailingArgs)
            trailingArgs = null
            return promise
         }
      })
      return currentPromise
   }

   function nyxdeferredFnWrapper(this: any, ...args: ArgumentsT) {
      if (currentPromise) {
         if (options.trailing)
            trailingArgs = args

         return currentPromise
      }
      return new Promise<ReturnT>((resolve) => {
         const shouldCallNow = !timeout && options.leading

         clearTimeout(timeout)
         timeout = setTimeout(() => {
            timeout = null
            const promise = options.leading
               ? leadingValue
               : applyFn(this, args)
            for (const _resolve of resolveList) _resolve(promise)

            resolveList = []
         }, wait)

         if (shouldCallNow) {
            leadingValue = applyFn(this, args)
            resolve(leadingValue)
         }
         else {
            resolveList.push(resolve)
         }
      })
   }

   return nyxdeferredFnWrapper
}

async function _applyPromised(fn: () => any, context: unknown, args: any[]) {
   return await fn.apply(context, args)
}
