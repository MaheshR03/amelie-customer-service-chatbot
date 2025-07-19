# Security Configuration Guide

## Overview

This document outlines the security improvements made to the Amélie Customer Service Chatbot to protect sensitive Firebase configuration and other credentials.

## Security Improvements

### 1. Environment-Based Configuration

**Problem**: Firebase API keys and other sensitive data were hardcoded in client-side JavaScript files.

**Solution**: 
- Moved sensitive configuration to environment variables
- Created secure configuration loading system
- Implemented fallback mechanisms for development

### 2. Configuration Files

#### `.env.example`
Template file showing required environment variables. Copy to `.env` and fill with actual values.

#### `config.js`
Updated to use template placeholders instead of hardcoded values.

#### `assets/js/firebase-config.js`
New secure Firebase initialization script with:
- Environment-aware configuration loading
- Graceful fallback handling
- Error management

### 3. Build Process

#### `scripts/build.js`
New build script that:
- Replaces configuration placeholders with environment variables
- Validates required environment variables
- Creates secure client-side configuration
- Provides deployment guidance

#### Updated package.json scripts:
- `npm run build:secure` - Process configuration safely
- `npm run deploy` - Secure build + deploy process
- `npm run env:validate` - Validate environment setup

## Implementation Details

### HTML Files Updated
All HTML files now use the secure Firebase initialization:

```javascript
// Before (INSECURE)
var firebaseConfig = {
    apiKey: "AIzaSyBEPqen-2NzZKNL3qId6Z8zIJFj6W3w-Q4",
    // ... other hardcoded values
};
firebase.initializeApp(firebaseConfig);

// After (SECURE)
async function initializeFirebaseSecurely() {
    const config = await loadSecureFirebaseConfig();
    if (config && !firebaseInitialized) {
        firebase.initializeApp(config);
        firebaseInitialized = true;
    }
}
```

### Environment-Aware Loading
- **Development**: Uses fallback configuration for localhost
- **Production**: Attempts to load from secure endpoint, falls back to basic config

### Fallback Mechanisms
- Local storage for chat messages when Firebase is unavailable
- Graceful degradation when configuration fails
- Error handling without exposing sensitive information

## Deployment Guide

### 1. Set Up Environment Variables

Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

Fill in your actual Firebase configuration values.

### 2. Build with Security

```bash
npm run build:secure
```

This will:
- Replace configuration placeholders
- Validate environment variables
- Create secure client configuration

### 3. Deploy Securely

```bash
npm run deploy
```

This runs the secure build process before deployment.

### 4. Production Environment Variables

For production deployment platforms (Netlify, Vercel, etc.), set these environment variables:

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_DATABASE_URL`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`
- `FIREBASE_MEASUREMENT_ID`

## Additional Security Measures

### 1. Firebase Security Rules
Ensure your Firebase Realtime Database rules are properly configured (see `database.rules.json`).

### 2. Domain Restrictions
Configure Firebase to only accept requests from your authorized domains.

### 3. API Key Restrictions
In Firebase Console, restrict your API keys to specific services and domains.

### 4. Regular Security Audits
- Review Firebase security rules regularly
- Monitor Firebase usage and authentication logs
- Update dependencies to patch security vulnerabilities

## Best Practices

1. **Never commit `.env` files** to version control
2. **Use different Firebase projects** for development and production
3. **Implement proper authentication** for admin functions
4. **Monitor Firebase usage** for suspicious activity
5. **Keep dependencies updated** for security patches

## Troubleshooting

### Configuration Not Loading
- Check that environment variables are set correctly
- Verify Firebase project settings
- Check browser console for initialization errors

### Firebase Connection Issues
- Verify Firebase security rules allow your domain
- Check API key restrictions in Firebase Console
- Ensure network connectivity to Firebase services

### Local Development Issues
- Ensure you're using `npm run build:secure` before testing
- Check that fallback configuration is working
- Verify localhost is handled correctly in configuration loader

## Migration from Previous Version

If upgrading from the previous version with hardcoded credentials:

1. Update all HTML files to use new secure initialization
2. Set up environment variables
3. Run secure build process
4. Test thoroughly before deploying
5. Update Firebase security settings

## Support

For security-related issues:
1. Check this documentation first
2. Review Firebase Console for configuration issues
3. Test with development environment before production
4. Create an issue on GitHub with security label (avoid posting sensitive data)
