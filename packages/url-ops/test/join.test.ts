import { describe, expect, test } from 'vitest'
import { joinURL } from '../src'

type InputTuple = [string | null, string | null, string | null]

describe('joinURL', () => {
   const tests: { input: InputTuple; out: string }[] = [
      { input: [null, null, null], out: '' },
      { input: ['/', null, null], out: '/' },

      { input: [null, './', null], out: './' },
      { input: ['/a', null, null], out: '/a' },
      { input: ['a', 'b', null], out: 'a/b' },
      { input: ['/', '/b', null], out: '/b' },
      { input: ['a', 'b/', 'c'], out: 'a/b/c' },
      { input: ['a', 'b/', '/c'], out: 'a/b/c' },
   ]

   for (const t of tests) {
      test(t.input.toString(), () => {
         expect(
            joinURL(
               t.input[0] ?? '',
               t.input[1] ?? '',
               t.input[2] ?? '',
            ),
         ).toBe(t.out)
      })
   }

   test('no arguments', () => {
      expect(joinURL('')).toBe('')
   })
})
