/* eslint-disable @typescript-eslint/no-invalid-this */
import Benchmark from 'benchmark'
import consolji from 'consolji'
import largeJson from './fixture/large.mjs'
import { objectHash } from 'nyxhash'

function generateItems(num) {
   return new Array(num).fill(0).map(() => {
      return {
         propNum: Math.random(),
         propBool: Math.random() > 0.5,
         propString: Math.random().toString(16),
         propDate: new Date(),
         propObj: {
            propNum: Math.random(),
            propBool: Math.random() > 0.5,
            propString: Math.random().toString(16),
            propDate: new Date(),
         },
      }
   })
}

const suite = new Benchmark.Suite()
const singleObject = generateItems(1)[0]
const tinyArray = generateItems(10)
const mediumArray = generateItems(100)
const largeArray = generateItems(1000)

suite.add('hash({})', () => {
   const v = objectHash({})
})

suite.add('hash(singleObject)', () => {
   const v = objectHash(singleObject)
})

suite.add('hash(tinyArray)', () => {
   const v = objectHash(tinyArray)
})

suite.add('hash(mediumArray)', () => {
   const v = objectHash(mediumArray)
})

suite.add('hash(largeArray)', () => {
   const v = objectHash(largeArray)
})

suite.add('hash(largeJson)', () => {
   const v = objectHash(largeJson)
})

suite.add('objectHash(largeJson, { unorderedObjects: true })', () => {
   const v = objectHash(largeJson, { unorderedObjects: true })
})

suite
// add listeners
   .on('cycle', (event) => {
      consolji.log(event.target.toString())
   })
   .on('complete', function () {
      consolji.log(`Fastest is ${this.filter('fastest').map('name')}`)
   })
   .run({
      async: false,
   })
