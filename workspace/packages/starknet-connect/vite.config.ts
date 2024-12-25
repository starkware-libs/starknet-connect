import {createRequire} from 'module';
import {resolve} from 'path';
import {defineConfig} from 'vite';

const require = createRequire(import.meta.url);
const {peerDependencies} = require('./package.json');

type ViteConfigInput = {
  mode: string;
};

export default ({mode}: ViteConfigInput) => {
  const prodMode = mode === 'production';

  return defineConfig({
    build: {
      emptyOutDir: false,
      outDir: 'dist',
      rollupOptions: {
        external: [...Object.keys(peerDependencies || {})]
      },
      lib: {
        entry: {
          index: resolve(__dirname, 'src/index.ts'),
          react: resolve(__dirname, 'src/wrapper/react/index.ts')
        },
        name: 'WebAppsStarknetConnector',
        formats: ['es', 'cjs'],
        fileName: (format, entryName) => {
          return `${entryName}.${format === 'cjs' ? 'js' : 'mjs'}`;
        }
      },
      sourcemap: !prodMode,
      copyPublicDir: false
    }
  });
};
