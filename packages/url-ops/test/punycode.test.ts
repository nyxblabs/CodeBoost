import { describe, expect, test } from 'vitest'
import { toASCII } from '../src/punycode'
import toAsciiTests from './fixture/toascii.json'

interface Test {
   input: string
   output: string | null
   comment?: string
}

const ignoredTests = new Set(['a­b', 'a%C2%ADb'])

describe('punycode (toASCII)', () => {
   const tests: Test[] = toAsciiTests
      .splice(1)
      .filter(t => typeof t === 'object' && t.output && !ignoredTests.has(t.input))
      .map(t => t as Test)

   for (const t of tests) {
      test(t.input + (t.comment ? `: ${t.comment}` : ''), () => {
         expect(toASCII(t.input)).toBe(t.output)
      })
   }
})
