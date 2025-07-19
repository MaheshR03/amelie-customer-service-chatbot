/**
 * Configuration file for Amélie Customer Service Chatbot
 * This file provides a centralized way to manage environment variables
 * and application configuration.
 */

// Environment Variables Configuration
const config = {
    // Firebase Configuration - Client-safe configuration
    firebase: {
        // Only include client-safe configuration values
        // Sensitive keys should be stored in environment variables on the server
        authDomain: "customer-service-chatbot-246d6.firebaseapp.com",
        projectId: "customer-service-chatbot-246d6",
        databaseURL: "https://customer-service-chatbot-246d6-default-rtdb.asia-southeast1.firebasedatabase.app",
        storageBucket: "customer-service-chatbot-246d6.firebasestorage.app",
        // API Key and other sensitive data will be loaded from environment
        apiKey: "${FIREBASE_API_KEY}", // Template placeholder - will be replaced during build
        messagingSenderId: "${FIREBASE_MESSAGING_SENDER_ID}", // Template placeholder
        appId: "${FIREBASE_APP_ID}", // Template placeholder
        measurementId: "${FIREBASE_MEASUREMENT_ID}" // Template placeholder
    },

    // Application Configuration
    app: {
        name: "Amélie Customer Service Chatbot",
        version: "2.0.0",
        environment: "production",
        debug: false
    },

    // Ollama Configuration
    ollama: {
        baseUrl: "http://localhost:11434",
        model: "llama2"
    },

    // Admin Configuration (Non-sensitive parts only)
    admin: {
        email: "admin@amelie.com"
    },

    // Client-side feature flags
    features: {
        voiceInput: true,
        analytics: true,
        adminPanel: true,
        offlineMode: true
    },

    // Email Configuration
    email: {
        smtp: {
            host: "${SMTP_HOST}" || "smtp.gmail.com",
            port: "${SMTP_PORT}" || 587,
            user: "${SMTP_USER}" || "",
            pass: "${SMTP_PASS}" || ""
        }
    },

    // Analytics Configuration
    analytics: {
        googleAnalyticsId: "${GOOGLE_ANALYTICS_ID}" || "G-B7E74QLH1Z"
    },

    // API Configuration
    api: {
        rateLimit: "${API_RATE_LIMIT}" || 100,
        rateWindow: "${API_RATE_WINDOW}" || 15
    },

    // Logging Configuration
    logging: {
        level: "${LOG_LEVEL}" || "info",
        file: "${LOG_FILE}" || "logs/app.log"
    },

    // CORS Configuration
    cors: {
        origin: "${CORS_ORIGIN}" ? "${CORS_ORIGIN}".split(',') : [
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
