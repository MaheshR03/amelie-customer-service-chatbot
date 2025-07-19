#!/usr/bin/env node

/**
 * Build script for Amélie Customer Service Chatbot
 * This script processes HTML files and replaces configuration placeholders
 * with environment variables or secure values.
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configuration mapping
const CONFIG_REPLACEMENTS = {
    '{{ FIREBASE_API_KEY }}': process.env.FIREBASE_API_KEY || 'FIREBASE_API_KEY_NOT_SET',
    '{{ FIREBASE_MESSAGING_SENDER_ID }}': process.env.FIREBASE_MESSAGING_SENDER_ID || 'SENDER_ID_NOT_SET',
    '{{ FIREBASE_APP_ID }}': process.env.FIREBASE_APP_ID || 'APP_ID_NOT_SET',
    '{{ FIREBASE_MEASUREMENT_ID }}': process.env.FIREBASE_MEASUREMENT_ID || 'MEASUREMENT_ID_NOT_SET'
};

// Files that need configuration replacement
const HTML_FILES = [
    'index.html',
    'admin.html',
    'Women.html',
    'Kids.html',
    'shoes.html',
    'contact.html'
];

function replaceConfigInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Replace configuration placeholders
        for (const [placeholder, value] of Object.entries(CONFIG_REPLACEMENTS)) {
            if (content.includes(placeholder)) {
                content = content.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
                modified = true;
            }
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated configuration in ${filePath}`);
        } else {
            console.log(`⏭️  No configuration updates needed for ${filePath}`);
        }
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
    }
}

function createSecureConfig() {
    const secureConfig = {
        firebase: {
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.FIREBASE_DATABASE_URL,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET
        },
        app: {
            name: process.env.APP_NAME || 'Amélie Customer Service Chatbot',
            version: process.env.APP_VERSION || '2.0.0',
            environment: process.env.APP_ENVIRONMENT || 'production'
        }
    };

    // Write public configuration (without sensitive data)
    fs.writeFileSync(
        path.join(__dirname, 'assets', 'js', 'app-config.js'),
        `// Auto-generated configuration - DO NOT EDIT\nwindow.APP_CONFIG = ${JSON.stringify(secureConfig, null, 2)};`,
        'utf8'
    );

    console.log('✅ Created secure app configuration');
}

function validateEnvironment() {
    const requiredVars = [
        'FIREBASE_API_KEY',
        'FIREBASE_PROJECT_ID',
        'FIREBASE_APP_ID',
        'FIREBASE_MESSAGING_SENDER_ID'
    ];

    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
        console.warn('⚠️  Warning: Missing environment variables:');
        missing.forEach(varName => console.warn(`   - ${varName}`));
        console.warn('   Application may not function correctly in production.');
        return false;
    }

    console.log('✅ All required environment variables are set');
    return true;
}

// Main build process
function main() {
    console.log('🚀 Starting Amélie Customer Service Chatbot build process...\n');

    // Validate environment
    const envValid = validateEnvironment();
    
    // Process HTML files
    console.log('📝 Processing HTML files...');
    HTML_FILES.forEach(file => {
        if (fs.existsSync(file)) {
            replaceConfigInFile(file);
        } else {
            console.warn(`⚠️  File not found: ${file}`);
        }
    });

    // Create secure configuration
    console.log('\n🔒 Creating secure configuration...');
    createSecureConfig();

    // Final validation
    console.log('\n🎉 Build process completed!');
    if (!envValid) {
        console.log('\n⚠️  Remember to set up environment variables for production deployment.');
    }
    
    console.log('\n📋 Next steps:');
    console.log('   1. Set up environment variables (.env file)');
    console.log('   2. Test the application locally');
    console.log('   3. Deploy to your hosting platform');
    console.log('   4. Configure Firebase security rules');
}

// Run the build process
if (require.main === module) {
    main();
}

module.exports = {
    replaceConfigInFile,
    createSecureConfig,
    validateEnvironment
};
