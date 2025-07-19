#!/usr/bin/env node

/**
 * Script to replace hardcoded Firebase credentials with environment variable placeholders
 * This ensures no credentials are committed to version control
 */

const fs = require('fs');
const path = require('path');

// Files that need credential replacement
const HTML_FILES = [
    'index.html',
    'admin.html',
    'Women.html',
    'Kids.html',
    'shoes.html',
    'contact.html'
];

// Credential replacements mapping
const CREDENTIAL_REPLACEMENTS = {
    'AIzaSyBEPqen-2NzZKNL3qId6Z8zIJFj6W3w-Q4': '${FIREBASE_API_KEY}',
    'customer-service-chatbot-246d6.firebaseapp.com': '${FIREBASE_AUTH_DOMAIN}',
    'https://customer-service-chatbot-246d6-default-rtdb.asia-southeast1.firebasedatabase.app': '${FIREBASE_DATABASE_URL}',
    'customer-service-chatbot-246d6': '${FIREBASE_PROJECT_ID}',
    'customer-service-chatbot-246d6.firebasestorage.app': '${FIREBASE_STORAGE_BUCKET}',
    '423454297999': '${FIREBASE_MESSAGING_SENDER_ID}',
    '1:423454297999:web:cd5295d557478344b085fa': '${FIREBASE_APP_ID}',
    'G-B7E74QLH1Z': '${FIREBASE_MEASUREMENT_ID}'
};

function replaceCredentialsInFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.warn(`⚠️  File not found: ${filePath}`);
            return;
        }

        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Replace hardcoded credentials with placeholders
        for (const [credential, placeholder] of Object.entries(CREDENTIAL_REPLACEMENTS)) {
            // Use regex with quotes to match exact credential strings
            const quotedCredential = `"${credential}"`;
            const quotedPlaceholder = `"${placeholder}"`;
            
            if (content.includes(quotedCredential)) {
                content = content.replace(new RegExp(quotedCredential.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), quotedPlaceholder);
                modified = true;
            }
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Replaced credentials with placeholders in ${filePath}`);
        } else {
            console.log(`⏭️  No credentials found to replace in ${filePath}`);
        }
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
    }
}

function main() {
    console.log('🔒 Starting credential cleanup process...\n');

    HTML_FILES.forEach(file => {
        replaceCredentialsInFile(file);
    });

    console.log('\n🎉 Credential cleanup completed!');
    console.log('\n⚠️  IMPORTANT: All HTML files now use environment variable placeholders');
    console.log('   Run "npm run build:secure" before deployment to replace placeholders with actual values');
    console.log('   Never commit files with replaced credentials to version control');
}

if (require.main === module) {
    main();
}

module.exports = {
    replaceCredentialsInFile,
    CREDENTIAL_REPLACEMENTS
};
