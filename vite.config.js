import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// In GitHub Actions, GITHUB_REPOSITORY è "owner/nome-repo".
// Usiamo solo il nome repo come base path per GitHub Pages.
const githubRepo = process.env.GITHUB_REPOSITORY?.split('/')[1]

export default defineConfig({
  plugins: [react()],
  server: { port: 5180 },
  base: githubRepo ? `/${githubRepo}/` : '/',
})
