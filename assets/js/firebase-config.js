/**
 * Secure Firebase Configuration and Initialization
 * This file handles Firebase initialization with environment-based configuration
 */

// Firebase configuration object with placeholders
// These will be replaced with actual values during build process or loaded from environment
let firebaseConfig = {
    apiKey: null,
    authDomain: "customer-service-chatbot-246d6.firebaseapp.com",
    databaseURL: "https://customer-service-chatbot-246d6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "customer-service-chatbot-246d6",
    storageBucket: "customer-service-chatbot-246d6.firebasestorage.app",
    messagingSenderId: null,
    appId: null,
    measurementId: null
};

// Function to load configuration securely
async function loadFirebaseConfig() {
    try {
        // In production, this would fetch from a secure endpoint
        // For now, we'll use a fallback configuration
        const response = await fetch('/api/config');
        if (response.ok) {
            const config = await response.json();
            return config.firebase;
        }
    } catch (error) {
        console.warn('Failed to load secure config, using fallback');
    }
    
    // Fallback configuration (these should be replaced in production)
    return {
        apiKey: "${FIREBASE_API_KEY}",
        authDomain: "${FIREBASE_AUTH_DOMAIN}",
        databaseURL: "${FIREBASE_DATABASE_URL}",
        projectId: "${FIREBASE_PROJECT_ID}",
        storageBucket: "${FIREBASE_STORAGE_BUCKET}",
        messagingSenderId: "${FIREBASE_MESSAGING_SENDER_ID}",
        appId: "${FIREBASE_APP_ID}",
        measurementId: "${FIREBASE_MEASUREMENT_ID}"
    };
}

// Function to initialize Firebase securely
async function initializeFirebase() {
    try {
        const config = await loadFirebaseConfig();
        
        // Validate required configuration
        if (!config.apiKey || !config.projectId) {
            throw new Error('Missing required Firebase configuration');
        }
        
        // Initialize Firebase
        firebase.initializeApp(config);
        
        console.log('Firebase initialized successfully');
        return true;
    } catch (error) {
        console.error('Failed to initialize Firebase:', error);
        return false;
    }
}

// Function to check if Firebase is available
function isFirebaseAvailable() {
    return typeof firebase !== 'undefined' && firebase.apps.length > 0;
}

// Export functions for use in other scripts
window.FirebaseManager = {
    initialize: initializeFirebase,
    isAvailable: isFirebaseAvailable,
    config: firebaseConfig
};

// Auto-initialize when the script loads (if Firebase SDK is available)
if (typeof firebase !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeFirebase();
    });
}
