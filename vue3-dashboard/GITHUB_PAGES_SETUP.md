# GitHub Pages Setup for Vue Dashboard

This guide explains how to set up GitHub Actions to automatically build and deploy the Vue dashboard to GitHub Pages.

## Prerequisites

1. Your repository is on GitHub
2. You have push access to the repository

## Setup Steps

### 1. Enable GitHub Pages (REQUIRED - Must be done manually first)

**IMPORTANT:** You must manually enable GitHub Pages before the workflow can deploy.

1. Go to your repository on GitHub: https://github.com/simpledotorg/hearts360-frontend-experiment
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **"GitHub Actions"** (not "Deploy from a branch")
4. Click **Save**

### 2. Set Workflow Permissions

1. Go to **Settings** → **Actions** → **General**
2. Scroll down to **Workflow permissions**
3. Select **"Read and write permissions"**
4. Check **"Allow GitHub Actions to create and approve pull requests"** (optional but recommended)
5. Click **Save**

### 2. Repository Name Configuration

The workflow automatically detects your repository name from the `GITHUB_REPOSITORY` environment variable. 

If you need to manually set the base path, edit `vite.config.js` and update the default fallback:

```js
// In vite.config.js, update this line:
return '/your-repo-name/'  // Change to match your repository name
```

### 3. Push to Trigger Build

The workflow will automatically run when you:
- Push to `main` or `master` branch
- Make changes to files in `vue3-dashboard/` directory
- Manually trigger via **Actions** tab → **Build and Deploy Vue Dashboard** → **Run workflow**

### 4. Access Your Site

Once deployed, your site will be available at:
```
https://your-username.github.io/your-repo-name/
```

## Workflow Details

The GitHub Actions workflow:
1. Checks out your code
2. Sets up Node.js 20
3. Installs dependencies from `vue3-dashboard/package-lock.json`
4. Builds the Vue app using `npm run build`
5. Deploys to GitHub Pages

## Troubleshooting

### Build Fails
- Check the **Actions** tab for error messages
- Ensure `package-lock.json` is committed
- Verify all dependencies are listed in `package.json`

### Site Not Loading / 404 Errors
- Verify the base path in `vite.config.js` matches your repository name
- Check GitHub Pages settings are configured correctly
- Wait a few minutes after deployment (GitHub Pages can take time to update)

### Assets Not Loading
- Ensure the `base` path in `vite.config.js` is correct
- Check browser console for 404 errors on assets
- Verify the build completed successfully

## Manual Deployment

If you prefer to deploy manually:

```bash
cd vue3-dashboard
npm install
npm run build
# Then manually upload the dist/ folder to GitHub Pages
```

