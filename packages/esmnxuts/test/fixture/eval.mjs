import { consolji } from 'consolji'
import { evalModule, fileURLToPath, loadModule } from 'esmnxuts'

await evalModule('console.log("Eval works!")')

await evalModule(
  `
  import { reverse } from './utils.mjs'
  console.log(reverse('!emosewa si sj'))
`,
  {
     url: fileURLToPath(import.meta.url),
  },
)

await loadModule('./hello.mjs', { url: import.meta.url })

consolji.log(
   await loadModule('../../package.json', { url: import.meta.url }).then(
      r => r.default.name,
   ),
)

await loadModule('./eval-err.mjs', { url: import.meta.url }).catch(e =>
   console.error(e),
)
