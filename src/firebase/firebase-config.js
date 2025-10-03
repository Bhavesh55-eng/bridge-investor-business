// Firebase Configuration Object
const firebaseConfig = {
    // Replace these with your actual Firebase project credentials
    apiKey: "your-api-key-here",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase only if config has been updated
if (firebaseConfig.apiKey !== "your-api-key-here") {
    try {
        // Import firebase modules if using module system or confirm Firebase library is loaded in HTML

        // Initialize Firebase App
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

        // Initialize services
        const auth = firebase.auth();
        const db = firebase.firestore();
        const storage = firebase.storage();

        // Use device language preference for Firebase UI
        auth.useDeviceLanguage();

        // Enable offline data persistence for Firestore
        db.enablePersistence().catch((err) => {
            console.warn('Firestore persistence error:', err);
        });

        // Expose Firebase services globally for usage in other scripts
        window.firebaseAuth = auth;
        window.firebaseDb = db;
        window.firebaseStorage = storage;

        console.log('✅ Firebase initialized successfully');

        // Optional: Initialize Firebase Analytics if supported
        if (typeof firebase.analytics === 'function') {
            firebase.analytics();
            console.log('📊 Firebase Analytics enabled');
        }
    } catch (error) {
        console.error('❌ Firebase initialization failed:', error);
        console.warn('🔧 Using mock authentication for development purposes');
    }
} else {
    console.warn('🔧 Firebase configuration not set. Using mock authentication.');
    console.log(`
📋 To enable Firebase:
1. Go to https://console.firebase.google.com/
2. Create or select a project
3. Go to Project Settings > General
4. Add a web app if not added
5. Copy config snippet and replace the placeholder values here
6. Enable Authentication and Firestore under Firebase Console
`);
}
