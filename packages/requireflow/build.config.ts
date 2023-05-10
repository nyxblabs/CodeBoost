import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
   externals: [
      'typescript',
   ],
   failOnWarn: false,
})
