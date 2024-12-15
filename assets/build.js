import esbuild from 'esbuild';
import sveltePlugin from 'esbuild-svelte';

const args = process.argv.slice(2);
const watch = args.includes('--watch');
const deploy = args.includes('--deploy');

const opts = {
  entryPoints: ['js/app.js'],
  bundle: true,
  minify: deploy,
  sourcemap: watch && 'inline',
  logLevel: 'info',
  target: 'es2020',
  outdir: '../priv/static/assets',
  external: ['*.css', 'fonts/*', 'images/*'],
  nodePaths: ['../deps'],
  format: 'esm',
  conditions: ['svelte'],
  plugins: [
    sveltePlugin({
      compilerOptions: {
        dev: watch,
        hydratable: true,
        generate: 'dom',
        css: 'external',
      },
    }),
  ],
};

if (watch) {
  esbuild
    .context(opts)
    .then((ctx) => {
      ctx.watch();
    })
    .catch((_error) => {
      process.exit(1);
    });
} else {
  esbuild.build(opts);
}
