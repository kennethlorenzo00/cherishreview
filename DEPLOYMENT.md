# 🚀 Deployment Guide

## GitHub Pages Deployment

### Method 1: Using GitHub Actions (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit: Cute Pomodoro Timer"
   git push origin main
   ```

2. **Create GitHub Actions workflow**
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v3
           
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'npm'
             
         - name: Install dependencies
           run: npm ci
           
         - name: Build
           run: npm run build
           
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./build
   ```

3. **Enable GitHub Pages**
   - Go to your repository Settings
   - Navigate to Pages section
   - Select "GitHub Actions" as source
   - Your site will be available at `https://yourusername.github.io/repository-name`

### Method 2: Manual Deployment

1. **Add homepage to package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/repository-name"
   }
   ```

2. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy scripts to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

## Netlify Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy options:**
   - **Drag & Drop**: Drag the `build` folder to Netlify
   - **Git Integration**: Connect your GitHub repository
   - **CLI**: Install Netlify CLI and run `netlify deploy`

## Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts** to connect your repository

## Environment Variables

For production builds, you might want to set these environment variables:

```bash
REACT_APP_TITLE=Cute Pomodoro Timer
REACT_APP_DESCRIPTION=A beautiful pomodoro timer with easter eggs
```

## Custom Domain

1. **GitHub Pages**: Add CNAME file in `public/` folder
2. **Netlify**: Configure in site settings
3. **Vercel**: Add domain in project settings

## Troubleshooting

### Common Issues:

1. **Build fails**: Check for syntax errors and missing dependencies
2. **404 on refresh**: Add `_redirects` file for SPA routing
3. **Assets not loading**: Verify `homepage` in package.json
4. **CORS issues**: Configure proper headers in deployment platform

### Performance Optimization:

1. **Enable compression** in your hosting platform
2. **Set cache headers** for static assets
3. **Use CDN** for better global performance
4. **Optimize images** and assets

## Security Considerations

1. **HTTPS**: Ensure your deployment uses HTTPS
2. **Environment variables**: Don't commit sensitive data
3. **Dependencies**: Regularly update packages
4. **Content Security Policy**: Add CSP headers if needed

---

Happy deploying! 🎉
