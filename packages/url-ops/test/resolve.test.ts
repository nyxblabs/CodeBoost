/* eslint-disable prefer-spread */
import { describe, expect, test } from 'vitest'
import { resolveURL } from '../src'

describe('resolveURL', () => {
   const tests = [
      { input: ['/'], out: '/' },
      { input: ['/a'], out: '/a' },
      { input: ['a', 'b'], out: 'a/b' },
      { input: ['a', 'b/', 'c'], out: 'a/b/c' },
      { input: ['a', 'b/', '/c'], out: 'a/b/c' },
      { input: ['/a?foo=bar#123', 'b/', 'c/'], out: '/a/b/c/?foo=bar#123' },
      { input: ['http://foo.com', 'a'], out: 'http://foo.com/a' },
      { input: ['a?x=1', 'b?y=2&y=3&z=4'], out: 'a/b?x=1&y=2&y=3&z=4' },
   ]

   for (const t of tests) {
      test(t.input.toString(), () => {
         expect(resolveURL.apply(null, t.input)).toBe(t.out)
      })
   }
})
