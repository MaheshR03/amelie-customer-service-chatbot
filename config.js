/**
 * Configuration file for Amélie Customer Service Chatbot
 * This file provides a centralized way to manage environment variables
 * and application configuration.
 */

// Environment Variables Configuration
const config = {
    // Firebase Configuration
    firebase: {
        apiKey: process.env.FIREBASE_API_KEY || "AIzaSyBEPqen-2NzZKNL3qId6Z8zIJFj6W3w-Q4",
        authDomain: process.env.FIREBASE_AUTH_DOMAIN || "customer-service-chatbot-246d6.firebaseapp.com",
        databaseURL: process.env.FIREBASE_DATABASE_URL || "https://customer-service-chatbot-246d6-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: process.env.FIREBASE_PROJECT_ID || "customer-service-chatbot-246d6",
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "customer-service-chatbot-246d6.firebasestorage.app",
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "423454297999",
        appId: process.env.FIREBASE_APP_ID || "1:423454297999:web:cd5295d557478344b085fa",
        measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-B7E74QLH1Z"
    },

    // Application Configuration
    app: {
        name: process.env.APP_NAME || "Amélie Customer Service Chatbot",
        version: process.env.APP_VERSION || "1.0.0",
        environment: process.env.APP_ENVIRONMENT || "development",
        debug: process.env.DEBUG === "true" || false
    },

    // Ollama Configuration
    ollama: {
        baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
        model: process.env.OLLAMA_MODEL || "llama2"
    },

    // Admin Configuration
    admin: {
        email: process.env.ADMIN_EMAIL || "admin@amelie.com",
        hashSalt: process.env.ADMIN_HASH_SALT || "amelie-salt-2024"
    },

    // Security Configuration
    security: {
        sessionSecret: process.env.SESSION_SECRET || "your-secret-key-here",
        jwtSecret: process.env.JWT_SECRET || "your-jwt-secret-here"
    },

    // Database Configuration
    database: {
        url: process.env.DATABASE_URL || "mongodb://localhost:27017/amelie-chatbot"
    },

    // Email Configuration
    email: {
        smtp: {
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: parseInt(process.env.SMTP_PORT) || 587,
            user: process.env.SMTP_USER || "",
            pass: process.env.SMTP_PASS || ""
        }
    },

    // Analytics Configuration
    analytics: {
        googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || "G-B7E74QLH1Z"
    },

    // API Configuration
    api: {
        rateLimit: parseInt(process.env.API_RATE_LIMIT) || 100,
        rateWindow: parseInt(process.env.API_RATE_WINDOW) || 15
    },

    // Logging Configuration
    logging: {
        level: process.env.LOG_LEVEL || "info",
        file: process.env.LOG_FILE || "logs/app.log"
    },

    // CORS Configuration
    cors: {
        origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [
            "http://localhost:3000",
            "http://localhost:8080",
            "http://127.0.0.1:5500"
        ]
    }
};

// Export configuration for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
}

// Export configuration for browser environments
if (typeof window !== 'undefined') {
    window.AmelieConfig = config;
}

// For client-side usage, create a simplified config object
const clientConfig = {
    firebase: config.firebase,
    app: {
        name: config.app.name,
        version: config.app.version,
        environment: config.app.environment
    },
    ollama: config.ollama,
    admin: {
        email: config.admin.email
    },
    analytics: config.analytics
};

// Export client configuration
if (typeof window !== 'undefined') {
    window.AmelieClientConfig = clientConfig;
}
