# 🚀 Guide: Deploying SkillHub to a Live Website

> [!WARNING]
> **গুরুত্বপূর্ণ নোটিশ (Important Warning):**
> আপনি স্ক্রিনশটে GitHub-এ একটি **নতুন রিপোজিটরি (New Repository)** তৈরি করার চেষ্টা করেছেন যার নাম দিয়েছেন `.github/workflows/deploy.yml`। **এটি করা যাবে না!**
> 
> আপনি নতুন কোনো রিপোজিটরি তৈরি করবেন না। আপনার আগের তৈরি করা **`SkillHub`** রিপোজিটরি-তে গিয়ে এই ফাইলটি তৈরি করতে হবে। নিচে বাংলা এবং ইংরেজিতে ধাপে ধাপে দেয়া গাইডটি ফলো করুন।

---

## 🇧🇩 বাংলায় ধাপে ধাপে গাইড (Step by Step Bengali Guide):

### ধাপ ১: সঠিক রিপোজিটরিতে যান
প্রথমে আপনার সাধারণ ব্রাউজার থেকে আপনার **`SkillHub`** নামক রিপোজিটরিতে যান (যেখানে আপনার প্রজেক্টের সব ফাইল আপলোড করেছেন)। লিংকটি দেখতে এরকম হবে:
`https://github.com/binarylife2026-stack/SkillHub`

### ধাপ ২: ফাইল তৈরি করুন (নতুন রিপোজিটরি নয়!)
১. আপনার **`SkillHub`** রিপোজিটরির ভেতরে ডানদিকের উপরে **`Add file`** বাটনে ক্লিক করুন এবং **`Create new file`** সিলেক্ট করুন।
২. **`Name your file...`** লিখার বক্সে হুবহু এই লেখাটি লিখবেন (এখানে কোনো ভুল করা যাবে না):
   ```text
   .github/workflows/deploy.yml
   ```
   *(আপনি যখনই `.github/` লিখে কিবোর্ডে `/` চাপবেন, এটি স্বয়ংক্রিয়ভাবে একটি ফোল্ডার তৈরি করে দেবে।*

### ধাপ ৩: কোড পেস্ট করুন
নিচের বক্সে যে বড় টেক্সট এডিটরটি এসেছে, সেখানে নিচের কোডটি সম্পূর্ণ কপি করে পেস্ট করে দিন:

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

### ধাপ ৪: কমিট করুন (Save)
১. কোডটি পেস্ট করার পর ডানদিকের উপরে থাকা সবুজ **`Commit changes...`** বাটনে ক্লিক করুন।
২. আবারো একটি ছোট পপআপ আসবে, সেখানে নিচে থাকা **`Commit changes`** বাটনে ক্লিক করুন। ফাইলটি সফলভাবে আপনার মেইন রিপোজিটরিতে যোগ হয়ে যাবে!

### ধাপ ৫: পারমিশন অন করুন (এটি অত্যন্ত গুরুত্বপূর্ণ!)
GitHub Actions স্বয়ংক্রিয়ভাবে ওয়েবসাইট বিল্ড করার জন্য পারমিশন দিতে হবে:
১. আপনার **`SkillHub`** রিপোজিটরির একদম উপরের মেনু থেকে **`Settings`** ট্যাবে যান।
২. বামদিকের সাইডবার থেকে **`Actions`** এবং তারপর তার নিচে থাকা **`General`** অপশনে ক্লিক করুন।
３. একদম স্ক্রল করে নিচে চলে যান এবং **`Workflow permissions`** সেকশনটি খুঁজুন।
৪. সেখানে **`Read and write permissions`** সিলেক্ট করুন এবং নিচের **`Save`** বাটনে ক্লিক করে সেভ করুন।

### ধাপ ৬: GitHub Pages চালু করুন
১. আবারো **`Settings`** ট্যাবে থাকুন, বামদিকের সাইডবার থেকে **`Pages`** অপশনে ক্লিক করুন।
২. **`Build and deployment`** ক্যাটাগরির নিচে থাকা **`Source`** ড্রপডাউনটি **`Deploy from a branch`** রাখুন।
３. **`Branch`** ড্রপডাউন থেকে **`gh-pages`** সিলেক্ট করুন (এটি কিছুক্ষণের মধ্যেই Actions রান হওয়ার পর নিজে থেকেই তৈরি হয়ে যাবে)। ফোল্ডারটি **`/ (root)`** রাখুন।
৪. ডানদিকের **`Save`** বাটনে ক্লিক করুন।

আপনার পেজটি ২-৩ মিনিটের মধ্যেই অনলাইনে চলে আসবে এবং আপনি আপনার লিংকে: `https://binarylife2026-stack.github.io/SkillHub/` রিফ্রেশ করলেই চমৎকার ওয়েবসাইটটি দেখতে পাবেন!

---

## 🇬🇧 English Guide

Since GitHub blocks third-party automated tools from pushing workflow (`.yml`) files directly for security reasons, we removed the automated workflow file from the commit. This allows your repository to sync to GitHub successfully!
