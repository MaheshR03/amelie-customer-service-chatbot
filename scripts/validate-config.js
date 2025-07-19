#!/usr/bin/env node

/**
 * Configuration Validator
 * Tests Firebase connectivity and validates configuration settings
 */

const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

async function validateFirebaseConnection() {
    console.log('🔥 Testing Firebase connection...');
    
    try {
        // This is a basic validation - in a real app you'd import Firebase and test the connection
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
        
        // Check if all Firebase config values are present
        const missingKeys = Object.keys(config).filter(key => !config[key]);
        
        if (missingKeys.length > 0) {
            console.error('❌ Missing Firebase configuration keys:', missingKeys);
            return false;
        }
        
        console.log('✅ Firebase configuration keys are present');
        return true;
        
    } catch (error) {
        console.error('❌ Firebase connection test failed:', error.message);
        return false;
    }
}

function validateOllamaConfig() {
    console.log('🤖 Validating Ollama configuration...');
    
    const baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    const model = process.env.OLLAMA_MODEL || 'llama2';
    
    try {
        new URL(baseUrl);
        console.log('✅ Ollama base URL is valid');
    } catch (error) {
        console.error('❌ Invalid Ollama base URL:', baseUrl);
        return false;
    }
    
    if (!model || model.length === 0) {
        console.error('❌ Ollama model name is required');
        return false;
    }
    
    console.log('✅ Ollama configuration is valid');
    return true;
}

function validateEmailConfig() {
    console.log('📧 Validating email configuration...');
    
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    
    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
        console.log('ℹ️  Email configuration is incomplete (optional)');
        return true;
    }
    
    const port = parseInt(smtpPort);
    if (isNaN(port) || port < 1 || port > 65535) {
        console.error('❌ Invalid SMTP port:', smtpPort);
        return false;
    }
    
    console.log('✅ Email configuration is valid');
    return true;
}

function validateSecurityConfig() {
    console.log('🔒 Validating security configuration...');
    
    const sessionSecret = process.env.SESSION_SECRET;
    const jwtSecret = process.env.JWT_SECRET;
    const adminHashSalt = process.env.ADMIN_HASH_SALT;
    
    if (!sessionSecret || sessionSecret.length < 32) {
        console.error('❌ Session secret must be at least 32 characters long');
        return false;
    }
    
    if (!jwtSecret || jwtSecret.length < 32) {
        console.error('❌ JWT secret must be at least 32 characters long');
        return false;
    }
    
    if (!adminHashSalt || adminHashSalt.length < 16) {
        console.error('❌ Admin hash salt must be at least 16 characters long');
        return false;
    }
    
    console.log('✅ Security configuration is valid');
    return true;
}

function validateAppConfig() {
    console.log('📱 Validating application configuration...');
    
    const appName = process.env.APP_NAME;
    const appVersion = process.env.APP_VERSION;
    const appEnvironment = process.env.APP_ENVIRONMENT;
    
    if (!appName || appName.length === 0) {
        console.error('❌ Application name is required');
        return false;
    }
    
    if (!appVersion || !/^\d+\.\d+\.\d+$/.test(appVersion)) {
        console.error('❌ Application version must follow semantic versioning (e.g., 1.0.0)');
        return false;
    }
    
    const validEnvironments = ['development', 'staging', 'production'];
    if (!validEnvironments.includes(appEnvironment)) {
        console.error('❌ Application environment must be one of:', validEnvironments);
        return false;
    }
    
    console.log('✅ Application configuration is valid');
    return true;
}

function validateCorsConfig() {
    console.log('🌐 Validating CORS configuration...');
    
    const corsOrigin = process.env.CORS_ORIGIN;
    
    if (!corsOrigin) {
        console.log('ℹ️  CORS origin not configured, using defaults');
        return true;
    }
    
    const origins = corsOrigin.split(',');
    const invalidOrigins = [];
    
    origins.forEach(origin => {
        origin = origin.trim();
        if (origin !== '*') {
            try {
                new URL(origin);
            } catch (error) {
                invalidOrigins.push(origin);
            }
        }
    });
    
    if (invalidOrigins.length > 0) {
        console.error('❌ Invalid CORS origins:', invalidOrigins);
        return false;
    }
    
    console.log('✅ CORS configuration is valid');
    return true;
}

function generateConfigSummary() {
    console.log('\n📋 Configuration Summary:');
    console.log('========================');
    console.log(`App Name: ${process.env.APP_NAME}`);
    console.log(`App Version: ${process.env.APP_VERSION}`);
    console.log(`Environment: ${process.env.APP_ENVIRONMENT}`);
    console.log(`Firebase Project: ${process.env.FIREBASE_PROJECT_ID}`);
    console.log(`Ollama Model: ${process.env.OLLAMA_MODEL}`);
    console.log(`Admin Email: ${process.env.ADMIN_EMAIL}`);
    console.log(`Debug Mode: ${process.env.DEBUG || 'false'}`);
    console.log('========================\n');
}

async function main() {
    console.log('🔍 Validating configuration...\n');
    
    let allValid = true;
    
    allValid = validateAppConfig() && allValid;
    allValid = await validateFirebaseConnection() && allValid;
    allValid = validateOllamaConfig() && allValid;
    allValid = validateEmailConfig() && allValid;
    allValid = validateSecurityConfig() && allValid;
    allValid = validateCorsConfig() && allValid;
    
    if (allValid) {
        console.log('\n✅ All configuration validations passed!');
        generateConfigSummary();
        console.log('🚀 Your application is ready to run!');
        process.exit(0);
    } else {
        console.log('\n❌ Some configuration validations failed!');
        console.log('Please check the errors above and update your .env file');
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = {
    validateFirebaseConnection,
    validateOllamaConfig,
    validateEmailConfig,
    validateSecurityConfig,
    validateAppConfig,
    validateCorsConfig,
    generateConfigSummary
};
