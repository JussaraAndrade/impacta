/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_COPILOT_API_URL?: string
	readonly VITE_COPILOT_API_TOKEN?: string
	readonly VITE_COPILOT_MODEL?: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
