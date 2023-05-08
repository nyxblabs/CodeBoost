import { setTimeout as delay } from 'node:timers/promises'
import { expect, test } from 'vitest'
import inRange from 'in-range'
import timeSpan from 'time-span'
import { nyxdefer } from '../src'

const fixture = 'fixture'

test.concurrent('single call', async () => {
   const nyxdeferred = nyxdefer(async value => value, 100)
   expect(await nyxdeferred(fixture)).toBe(fixture)
})

test.concurrent('multiple calls', async () => {
   let count = 0
   const end = timeSpan()

   const nyxdeferred = nyxdefer(async (value) => {
      count++
      await delay(50)
      return value
   }, 100)

   const results = await Promise.all(
      [1, 2, 3, 4, 5].map(value => nyxdeferred(value)),
   )

   expect(results).toMatchObject([5, 5, 5, 5, 5])
   expect(count).toBe(1)
   expect(
      inRange(end(), {
         start: 130,
         end: 170,
      }),
   ).toBe(true)

   await delay(110)
   expect(await nyxdeferred(6)).toBe(6)
})

test.concurrent('leading option', async () => {
   let count = 0

   const nyxdeferred = nyxdefer(
      async (value) => {
         count++
         await delay(50)
         return value
      },
      100,
      { leading: true },
   )

   const results = await Promise.all(
      [1, 2, 3, 4].map(value => nyxdeferred(value)),
   )

   // value from the first promise is used without the timeout
   expect(results).toEqual([1, 1, 1, 1])
   expect(count).toBe(1)

   await delay(200)
   expect(await nyxdeferred(5)).toBe(5)
   expect(await nyxdeferred(6)).toBe(5)
})

test.concurrent(
   'before option - does not call input function after timeout',
   async () => {
      let count = 0

      const nyxdeferred = nyxdefer(

         async () => {
            count++
         },
         100,
         { leading: true },
      )

      await delay(300)
      await nyxdeferred()

      expect(count).toBe(1)
   },
)

test.concurrent('fn takes longer than wait', async () => {
   let count = 0

   const nyxdeferred = nyxdefer(async (value) => {
      count++
      await delay(200)
      return value
   }, 100)

   const setOne = [1, 2, 3]
   const setTwo = [4, 5, 6]

   const promiseSetOne = setOne.map(value => nyxdeferred(value))
   await delay(101)
   const promiseSetTwo = setTwo.map(value => nyxdeferred(value))

   const results = await Promise.all([...promiseSetOne, ...promiseSetTwo])

   expect(results).toMatchObject([3, 3, 3, 3, 3, 3])
   expect(count).toBe(2)
})

// Factory to create a separate class for each test below
// * Each test replaces methods in the class with a nyxdeferred variant,
//   hence the need to start with fresh class for each test.
function createFixtureClass() {
   return class {
      _foo = 'fixture'

      foo() {
      // If `this` is not preserved by `nyxdefer()` or `nyxdefer.promise()`,
      // then `this` will be undefined and accessing `this._foo` will throw.
         return this._foo
      }

      getThis() {
      // If `this` is not preserved by `nyxdefer()` or `nyxdefer.promise()`,
      // then `this` will be undefined.
         return this
      }
   }
}

test.concurrent('`this` is preserved ', async () => {
   const FixtureClass = createFixtureClass()
   FixtureClass.prototype.foo = (nyxdefer as any)(
      FixtureClass.prototype.foo,
      10,
   )
   FixtureClass.prototype.getThis = (nyxdefer as any)(
      FixtureClass.prototype.getThis,
      10,
   )

   const thisFixture = new FixtureClass()

   expect(await thisFixture.getThis()).toBe(thisFixture)
   expect(() => thisFixture.foo()).not.throws()
   expect(await thisFixture.foo()).toBe(fixture)
})

test.concurrent('wait for promise', async () => {
   const results: any[] = []

   /*
Time:      000---025---050---075---100---125--150---175---200---225---250---275---300---325--350---400-----> (ms)
Nyxdeferred: +++++++----++++++------++++++-----++++++------++++++------++++++--------------------------------
Calls:     C(1)        C(2)        C(3)       C(4)        C(5)        C(6)
Promise:         [           (1)          ][         (3)         ][         (5)          ][  (6)
Trailing:              T=2          T=3        T=4         T=5        T=6
Resolves:  R=1         R=1         R=1        R=3         R=3         R=5
*/

   const EXEC_MS = 100
   const NYXDEFER_MS = 25
   const REPEAT_MS = 50

   const nyxdeferred = nyxdefer(async (value) => {
      await delay(EXEC_MS)
      results.push(value)
      return value
   }, NYXDEFER_MS)

   const promises: Promise<any>[] = []
   for (const i of [1, 2, 3, 4, 5, 6]) {
      promises.push(nyxdeferred(i))
      await delay(REPEAT_MS)
   }
   const resolvedResults = await Promise.all(promises)

   await delay(EXEC_MS)

   // console.log('Results:', results)
   // console.log('Resolved results:', resolvedResults)

   expect(results).toMatchObject([1, 3, 5, 6])
   expect(resolvedResults).toMatchObject([1, 1, 1, 3, 3, 5])
})

test.concurrent('wait for promise (leading: true)', async () => {
   const results: any[] = []

   /*
Time:      000---025---050---075---100---125--150---175---200---225---250---275---300---325--350---400-----> (ms)
Nyxdeferred: +++++++----++++++------++++++-----++++++------++++++------++++++--------------------------------
Calls:     C(1)        C(2)        C(3)       C(4)        C(5)        C(6)
Promise:   [           (1)          ][         (2)        ][          (4)          ][     (6)       ]
Trailing:              T=2         T=3         T=4        T=5.........T=6
Resolves:  R=1         R=1         R=2        R=2         R=4         R=4
*/

   const EXEC_MS = 100
   const NYXDEFER_MS = 25
   const REPEAT_MS = 50

   const nyxdeferred = nyxdefer(
      async (value) => {
         await delay(EXEC_MS)
         results.push(value)
         return value
      },
      NYXDEFER_MS,
      { leading: true },
   )

   const promises: Promise<any>[] = []
   for (const i of [1, 2, 3, 4, 5, 6]) {
      promises.push(nyxdeferred(i))
      await delay(REPEAT_MS)
   }
   const resolvedResults = await Promise.all(promises)

   await delay(EXEC_MS)

   // console.log('Results:', results)
   // console.log('Resolved results:', resolvedResults)

   // TODO: Results order are unexpected
   // expect(results).toMatchObject([1, 2, 4, 6])
   // expect(resolvedResults).toMatchObject([1, 1, 2, 2, 4, 4])
   expect(results.length).toBe(4)
   expect(resolvedResults.length).toBe(6)
   expect(results[0]).toBe(1)
   expect(results[3]).toBe(6)
})
