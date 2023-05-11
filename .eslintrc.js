module.exports = {
   root: true,
   // This tells ESLint to load the config from the package `eslint-config-custom`
   extends: ['@nyxb'],
   rules: {
      '@next/next/no-html-link-for-pages': 0,
   },
   settings: {
      react: {
         version: '16.0',
      },
   },
}
