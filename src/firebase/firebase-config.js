// Import the functions you need from the SDKs you need
// <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js"></script>

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const db = firebase.firestore();

// Export for use in other modules
window.firebaseAuth = auth;
window.firebaseDb = db;
