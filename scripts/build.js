import spawn from 'cross-spawn'
import fse from 'fs-extra'
import nw from 'nw-builder'
import pkg from '../package.json' with { type: 'json' }

process.env.NODE_ENV = 'production'

fse.removeSync('build')
fse.removeSync('dist')

spawn.sync('vite', ['build'], { stdio: 'inherit' })

fse.copySync('src-main', 'build/nw')

delete pkg.scripts
delete pkg.devDependencies
pkg.main = 'nw/index.js'
fse.writeJSONSync('build/package.json', pkg)

await nw({
  glob: false,
  mode: 'build',
  platform: 'win',
  arch: 'x64',
  flavor: 'normal',
  managedManifest: true,
  app: {
    name: 'hello',
    icon: 'icons/icon.ico',
  },
  srcDir: 'build',
  outDir: 'dist/win-x64',
})

console.log('Done')
