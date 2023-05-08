import { copyFileSync, unlinkSync } from 'node:fs'
import consolji from 'consolji'

// Creates a temporary copy of the original README.md file
copyFileSync('README.md', 'README-original.md')

// Replaces the README.md file with the README-npm.md file
copyFileSync('README-npm.md', 'README.md')

consolji.log('README.md updated for npm. Run pnpm publish now.')

process.on('exit', () => {
   // Restores the original README.md file from the temporary copy
   copyFileSync('README-original.md', 'README.md')

   // Deletes the temporary copy of the original README.md file
   unlinkSync('README-original.md')

   consolji.log('README.md restored to original version.')
})
