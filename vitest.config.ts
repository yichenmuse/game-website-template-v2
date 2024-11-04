/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vitest/config"

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "node",
		testTimeout: 30_000,
	},
})
