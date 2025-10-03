// Enhanced Authentication handling with Firebase integration
class AuthManager {
    constructor() {
        this.setupFormHandlers();
        this.initializeFirebase();
    }

    async initializeFirebase() {
        // Check if Firebase is available
        if (typeof firebase === 'undefined') {
            console.warn('Firebase not loaded. Using mock authentication.');
            this.useFirebase = false;
            return;
        }

        try {
            // Initialize Firebase Auth
            this.auth = firebase.auth();
            this.db = firebase.firestore();
            this.useFirebase = true;

            // Setup auth state listener
            this.auth.onAuthStateChanged((user) => {
                this.handleAuthStateChange(user);
            });

            // Setup Google provider
            this.googleProvider = new firebase.auth.GoogleAuthProvider();
            this.googleProvider.addScope('email');
            this.googleProvider.addScope('profile');

            console.log('Firebase initialized successfully');
        } catch (error) {
            console.error('Firebase initialization failed:', error);
            this.useFirebase = false;
        }
    }

    setupFormHandlers() {
        // Register form handler
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        // Login form handler
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Google Sign In buttons
        const googleSignIn = document.getElementById('googleSignIn');
        if (googleSignIn) {
            googleSignIn.addEventListener('click', () => this.handleGoogleAuth());
        }

        const googleSignUp = document.getElementById('googleSignUp');
        if (googleSignUp) {
        }
