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
    icon: 'icons/icon.ico',
  },
  srcDir: 'build',
  outDir: 'dist/win-x64',
})

// await nw({
//   glob: false,
//   mode: 'build',
//   platform: 'win',
//   arch: 'arm64',
//   flavor: 'normal',
//   managedManifest: true,
//   app: {
//     icon: 'icons/icon.ico',
//   },
//   srcDir: 'build',
//   outDir: 'dist/win-arm64',
// })

// await nw({
//   glob: false,
//   mode: 'build',
//   platform: 'linux',
//   arch: 'x64',
//   flavor: 'normal',
//   managedManifest: true,
//   app: {
//     icon: 'icons/icon.png',
//   },
//   srcDir: 'build',
//   outDir: 'dist/linux-x64',
// })

// await nw({
//   glob: false,
//   mode: 'build',
//   platform: 'linux',
//   arch: 'arm64',
//   flavor: 'normal',
//   managedManifest: true,
//   app: {
//     icon: 'icons/icon.png',
//   },
//   srcDir: 'build',
//   outDir: 'dist/linux-arm64',
// })

// await nw({
//   glob: false,
//   mode: 'build',
//   platform: 'osx',
//   arch: 'x64',
//   flavor: 'normal',
//   managedManifest: true,
//   app: {
//     icon: 'icons/icon.icns',
//     LSApplicationCategoryType: 'public.app-category.utilities',
//     NSHumanReadableCopyright: 'Copyright © 2026 Devclassic',
//   },
//   srcDir: 'build',
//   outDir: 'dist/osx-x64',
// })

// await nw({
//   glob: false,
//   mode: 'build',
//   platform: 'osx',
//   arch: 'arm64',
//   flavor: 'normal',
//   managedManifest: true,
//   app: {
//     icon: 'icons/icon.icns',
//     LSApplicationCategoryType: 'public.app-category.utilities',
//     NSHumanReadableCopyright: 'Copyright © 2026 Devclassic',
//   },
//   srcDir: 'build',
//   outDir: 'dist/osx-arm64',
// })

console.log('Done')
