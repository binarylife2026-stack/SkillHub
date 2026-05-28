# 🚀 Guide: Deploying SkillHub to a Live Website

Since GitHub blocks third-party automated tools from pushing workflow (`.yml`) files directly for security reasons, we removed the automated workflow file from the commit. This allows your repository to sync to GitHub successfully!

Here is how you can host your website and set up an automatic live link for free.

---

## Option 1: Free Hosting with Vercel or Netlify (Easiest - 1 Minute)
These are static React hosting services that connect to your GitHub repository and automatically build/deploy your site every time you push code.

### Using Vercel:
1. Go to [Vercel](https://vercel.com/) and sign up with your **GitHub** account.
2. Click **Add New** > **Project**.
3. Import your **SkillHub** repository.
4. Click **Deploy**. Vercel will automatically detect Vite and host your app live!

### Using Netlify:
1. Go to [Netlify](https://www.netlify.com/) and sign up with your **GitHub** account.
2. Click **Add new site** > **Import an existing project**.
3. Select **GitHub** and authorize your repo.
4. Click **Deploy site**.

---

## Option 2: Deploying to GitHub Pages (Manual Workflow Setup)
If you prefer to host directly on GitHub Pages using a workflow, you can add the file yourself on GitHub where you have full permissions:

1. Go to your repository on **GitHub.com**.
2. Click on **Add file** > **Create new file**.
3. Enter the name of the file exactly as: `.github/workflows/deploy.yml`
4. Copy and paste the following workflow code into the editor:

```yaml
# Automated deployment workflow for SkillHub React App on GitHub Pages
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
      - master

permissions:
  contents: write

jobs:
  build-and-deploy:
    concurrency: ci-${{ github.ref }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js Environment
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm install

      - name: Build Production Assets
        run: npm run build

      - name: Deploy static folder to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages
```

5. **Commit the changes** directly on GitHub.
6. Go to **Settings** > **Pages** inside your GitHub repository.
7. Under **Build and deployment** > **Source**, make sure it is set to **Deploy from a branch**.
8. Select the `gh-pages` branch and the `/ (root)` folder, then click **Save**.
9. Your site will be online at: `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPO_NAME>/`
