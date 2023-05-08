import { copyFileSync, unlinkSync } from 'node:fs'
import { consolji } from 'consolji'

// Restores the original README.md file from the temporary copy
copyFileSync('README-original.md', 'README.md')

// Deletes the temporary copy of the original README.md file
unlinkSync('README-original.md')

consolji.log('README.md restored to original version.')
