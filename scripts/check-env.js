#!/usr/bin/env node

/**
 * Environment Configuration Checker
 * Validates that all required environment variables are present
 */

const fs = require('fs');
const path = require('path');

const requiredEnvVars = [
    'FIREBASE_API_KEY',
    'FIREBASE_AUTH_DOMAIN',
    'FIREBASE_DATABASE_URL',
    'FIREBASE_PROJECT_ID',
    'FIREBASE_STORAGE_BUCKET',
    'FIREBASE_MESSAGING_SENDER_ID',
    'FIREBASE_APP_ID',
    'FIREBASE_MEASUREMENT_ID',
    'APP_NAME',
    'APP_VERSION',
    'APP_ENVIRONMENT',
    'OLLAMA_BASE_URL',
    'OLLAMA_MODEL',
    'ADMIN_EMAIL',
    'ADMIN_HASH_SALT',
    'SESSION_SECRET',
    'JWT_SECRET'
];

const optionalEnvVars = [
    'DATABASE_URL',
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'GOOGLE_ANALYTICS_ID',
    'API_RATE_LIMIT',
    'API_RATE_WINDOW',
    'LOG_LEVEL',
    'LOG_FILE',
    'CORS_ORIGIN',
    'DEBUG'
];

function checkEnvFile() {
    const envPath = path.join(process.cwd(), '.env');
    
    if (!fs.existsSync(envPath)) {
        console.error('❌ .env file not found!');
        console.log('📄 Please create a .env file using .env.example as a template');
        process.exit(1);
    }
    
    console.log('✅ .env file found');
    return true;
}

function loadEnvFile() {
    try {
        require('dotenv').config();
        console.log('✅ Environment variables loaded');
    } catch (error) {
        console.error('❌ Error loading .env file:', error.message);
        process.exit(1);
    }
}

function checkRequiredVars() {
    const missing = [];
    
    requiredEnvVars.forEach(varName => {
        if (!process.env[varName]) {
            missing.push(varName);
        }
    });
    
    if (missing.length > 0) {
        console.error('❌ Missing required environment variables:');
        missing.forEach(varName => console.error(`   - ${varName}`));
        process.exit(1);
    }
    
    console.log('✅ All required environment variables are present');
}

function checkOptionalVars() {
    const missing = [];
    
    optionalEnvVars.forEach(varName => {
        if (!process.env[varName]) {
            missing.push(varName);
        }
    });
    
    if (missing.length > 0) {
        console.log('ℹ️  Optional environment variables not set:');
        missing.forEach(varName => console.log(`   - ${varName}`));
    }
}

function validateFirebaseConfig() {
    const config = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
    };
    
    // Basic validation
    if (!config.apiKey.startsWith('AIza')) {
        console.warn('⚠️  Firebase API Key format looks suspicious');
    }
    
    if (!config.authDomain.includes('.firebaseapp.com')) {
        console.warn('⚠️  Firebase Auth Domain format looks suspicious');
    }
    
    if (!config.databaseURL.includes('firebasedatabase.app')) {
        console.warn('⚠️  Firebase Database URL format looks suspicious');
    }
    
    console.log('✅ Firebase configuration format validated');
}

function main() {
    console.log('🔍 Checking environment configuration...\n');
    
    checkEnvFile();
    loadEnvFile();
    checkRequiredVars();
    checkOptionalVars();
    validateFirebaseConfig();
    
    console.log('\n✅ Environment configuration check complete!');
    console.log('🚀 You can now run: npm start');
}

if (require.main === module) {
    main();
}

module.exports = {
    checkEnvFile,
    loadEnvFile,
    checkRequiredVars,
    checkOptionalVars,
    validateFirebaseConfig
};
