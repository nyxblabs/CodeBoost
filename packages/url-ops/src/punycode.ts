/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// Tree-shaked + Minified version of punycode@2.1.1/punycode.es6.js#toASCII
const n = /[^\0-\x7E]/
const t = /[\x2E\u3002\uFF0E\uFF61]/g
const o = {
   'overflow': 'Overflow Error',
   'not-basic': 'Illegal Input',
   'invalid-input': 'Invalid Input',
}
const e = Math.floor
const r = String.fromCharCode
function s(n) {
   throw new RangeError(o[n])
}
const c = function (n, t) {
   return n + 22 + 75 * (n < 26) - ((t != 0) << 5)
}
const u = function (n, t, o) {
   let r = 0
   for (n = o ? e(n / 700) : n >> 1, n += e(n / t); n > 455; r += 36)
      n = e(n / 35)

   return e(r + (36 * n) / (n + 38))
}
export function toASCII(o) {
   return (function (n, o) {
      const e = n.split('@')
      let r = ''
      e.length > 1 && ((r = `${e[0]}@`), (n = e[1]))
      const s = (function (n, t) {
         const o = []
         let e = n.length
         for (; e--;)
            o[e] = t(n[e])

         return o
      })((n = n.replace(t, '.')).split('.'), o).join('.')
      return r + s
   })(o, (t) => {
      return n.test(t)
         ? `xn--${
           (function (n) {
             const t = []
            const o = (n = (function (n) {
                const t = []
              let o = 0
              const e = n.length
              for (; o < e;) {
                   const r = n.charCodeAt(o++)
                if (r >= 55296 && r <= 56319 && o < e) {
                      const e = n.charCodeAt(o++);
                      (64512 & e) == 56320
                         ? t.push(((1023 & r) << 10) + (1023 & e) + 65536)
                         : (t.push(r), o--)
                }
 else {
                      t.push(r)
                }
                }
                return t
            })(n)).length
            let f = 128
            let i = 0
            let l = 72
            for (const o of n)
              o < 128 && t.push(r(o))

             const h = t.length
            let p = h
            for (h && t.push('-'); p < o;) {
                let o = 2147483647
              for (const t of n)
                t >= f && t < o && (o = t)

                const a = p + 1
              o - f > e((2147483647 - i) / a) && s('overflow'),
                (i += (o - f) * a),
                (f = o)
              for (const o of n) {
                   if ((o < f && ++i > 2147483647 && s('overflow'), o == f)) {
                      let n = i
                  for (let o = 36; ; o += 36) {
                         const s = o <= l ? 1 : o >= l + 26 ? 26 : o - l
                    if (n < s)
                      break

                         const u = n - s
                    const f = 36 - s
                    t.push(r(c(s + (u % f), 0))), (n = e(u / f))
                  }
                      t.push(r(c(n, 0))), (l = u(i, a, p == h)), (i = 0), ++p
                }
                }
                ++i, ++f
            }
             return t.join('')
          })(t)}`
         : t
   })
}
