import spawn from 'cross-spawn'
import nw from 'nw-builder'

process.env.NODE_ENV = 'development'

spawn('vite', { stdio: 'inherit' })

await nw({
  glob: false,
  mode: 'run',
  flavor: 'sdk',
  srcDir: '.',
})
