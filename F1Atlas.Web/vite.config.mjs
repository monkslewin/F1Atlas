import { defineConfig } from "vite";

export default defineConfig({
    build: {
        outDir: "wwwroot/js",
        emptyOutDir: false,
        lib: {
            entry: "src/globe.js",
            formats: ["es"],
            fileName: () => "globe.js"
        }
    }
});