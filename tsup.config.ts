// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm', 'cjs'],
	external: ['react', 'react-dom'],
	dts: true,
	minify: true,
	clean: true,
	treeshake: true,
	sourcemap: true,
	loader: {
		'.css': 'copy',
	},
});
