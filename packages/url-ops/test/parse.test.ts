import { describe, expect, test } from 'vitest'
import { parseHost, parseURL } from '../src'

describe('parseURL', () => {
   const tests = [
      {
         input: '//test',
         out: {
            auth: '',
            hash: '',
            host: 'test',
            pathname: '',
            protocol: '',
            search: '',
         },
      },
      {
         input: 'https://test.com',
         out: {
            auth: '',
            hash: '',
            host: 'test.com',
            pathname: '',
            protocol: 'https:',
            search: '',
         },
      },
      {
         input: 'http://test.com?foo=bar',
         out: {
            auth: '',
            hash: '',
            host: 'test.com',
            pathname: '',
            protocol: 'http:',
            search: '?foo=bar',
         },
      },
      { input: '/test', out: { hash: '', pathname: '/test', search: '' } },
      {
         input: 'file:///home/user',
         out: {
            auth: '',
            hash: '',
            host: '',
            pathname: '/home/user',
            protocol: 'file:',
            search: '',
         },
      },
      {
         input: 'file:///C:/home/user',
         out: {
            auth: '',
            hash: '',
            host: '',
            pathname: 'C:/home/user',
            protocol: 'file:',
            search: '',
         },
      },
      {
         input: 'https://host.name\\@foo.bar/meme3.php?url=http://0.0.0.0/2.svg',
         out: {
            auth: '',
            hash: '',
            host: 'host.name',
            pathname: '/@foo.bar/meme3.php',
            protocol: 'https:',
            search: '?url=http://0.0.0.0/2.svg',
         },
      },
      {
         input: 'https://domain.test:3000#owo',
         out: {
            protocol: 'https:',
            auth: '',
            host: 'domain.test:3000',
            pathname: '',
            search: '',
            hash: '#owo',
         },
      },
   ]

   for (const t of tests) {
      test(t.input.toString(), () => {
         expect(parseURL(t.input)).toEqual(t.out)
      })
   }
})

describe('parseHost', () => {
   const tests = [
      { input: 'localhost:3000', out: { hostname: 'localhost', port: '3000' } },
      { input: 'google.com', out: { hostname: 'google.com', port: undefined } },
   ]

   for (const t of tests) {
      test(t.input, () => {
         expect(parseHost(t.input)).toStrictEqual(t.out)
      })
   }
})
