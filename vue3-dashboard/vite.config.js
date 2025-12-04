import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// Get base path from environment variable or default to repository name
// For GitHub Pages: if repo is 'username/repo-name', base should be '/repo-name/'
// Set GITHUB_REPOSITORY env var in GitHub Actions, or use default
const getBasePath = () => {
  if (process.env.NODE_ENV !== 'production') return '/'
  
  // If GITHUB_REPOSITORY is set (e.g., "username/repo-name"), extract repo name
  if (process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1]
    return `/${repoName}/`
  }
  
  // Default fallback - update this to match your repository name
  return '/hearst360-package/'
}

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  base: getBasePath(),
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})

