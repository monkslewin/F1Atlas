import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'wwwroot/js',
        emptyOutDir: false,
        rollupOptions: {
            input: 'src/main.js',
            output: {
                entryFileNames: 'globe.js'
            }
        }
    }
});