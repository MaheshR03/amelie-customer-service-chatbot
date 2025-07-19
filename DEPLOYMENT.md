# Amélie Customer Service Chatbot - Deployment Guide

## Pre-Deployment Security Setup

### 1. Database Security Rules
The project includes secure database rules in `database.rules.json`:
- **Products**: Public read, authenticated write
- **Chats/Analytics**: Authenticated access only
- **Contacts**: Public write (for contact form), authenticated read
- **Admin**: Authenticated access only

### 2. Firebase Authentication Setup
Before deploying, set up Firebase Authentication:

1. Go to Firebase Console → Authentication → Sign-in method
2. Enable **Email/Password** authentication
3. Add your admin email in the Users tab
4. Update the admin panel to use proper authentication

### 3. Environment Variables
Ensure your `.env` file contains:
```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_DATABASE_URL=your_database_url
FIREBASE_PROJECT_ID=your_project_id
```

## Deployment Options

### Prerequisites
- Node.js installed
- Firebase account
- Firebase CLI installed

### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase
```bash
firebase login
```

### Step 3: Initialize Firebase Hosting
```bash
firebase init hosting
```

**Configuration options:**
- Use existing project: `customer-service-chatbot-246d6`
- Public directory: `.` (current directory)
- Single-page app: `No`
- Overwrite files: `No`

### Step 4: Deploy
```bash
# Deploy both database rules and hosting
npm run deploy

# Or deploy components separately:
npm run deploy:database  # Deploy database rules only
npm run deploy:hosting   # Deploy hosting only
```

### Step 5: Custom Domain (Optional)
```bash
firebase hosting:channel:deploy production --expires 30d
```

---

## 🌐 Alternative Deployment Options

### Netlify Deployment
1. Push code to GitHub repository
2. Connect Netlify to GitHub
3. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `.`
4. Deploy automatically on push

### Vercel Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts
4. Deploy with: `vercel --prod`

### GitHub Pages
1. Create GitHub repository
2. Push code to `main` branch
3. Enable GitHub Pages in repository settings
4. Set source to `main` branch

---

## 📋 Pre-Deployment Checklist

### ✅ Code Optimization
- [x] Environment variables configured
- [x] Firebase configuration updated
- [x] Analytics setup complete
- [ ] Build process optimized
- [ ] Assets minified

### ✅ Security
- [x] Sensitive data in environment variables
- [x] Firebase security rules configured
- [ ] Admin authentication secured
- [ ] CORS properly configured

### ✅ Performance
- [ ] Images optimized
- [ ] CSS/JS minified
- [ ] Caching headers configured
- [ ] CDN integration

### ✅ SEO & Accessibility
- [ ] Meta tags added
- [ ] Favicon configured
- [ ] Sitemap generated
- [ ] Accessibility tested

---

## 🛠️ Build Optimization Scripts

The following scripts will help optimize your deployment:

### Minification
```bash
npm run build
```

### Environment Validation
```bash
npm run env:validate
```

### Production Testing
```bash
npm run start
```

---

## 🌍 Production URLs

After deployment, your app will be available at:
- **Firebase**: `https://customer-service-chatbot-246d6.web.app`
- **Custom Domain**: `https://your-domain.com`

---

## 📞 Support

For deployment issues:
1. Check Firebase console for errors
2. Review deployment logs
3. Validate environment configuration
4. Test locally first with `npm run env:validate`

Happy deploying! 🚀
