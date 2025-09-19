// Main Application Logic
class BridgeApp {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.checkAuthState();
        this.setupEventListeners();
        console.log("Bridge App initialized!");
    }

    checkAuthState() {
        // Check if user is logged in (will integrate with Firebase later)
        const savedUser = localStorage.getItem('bridgeUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        }
    }

    setupEventListeners() {
        // Handle navigation
        document.addEventListener('DOMContentLoaded', () => {
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        });
    }

    // Utility functions
    showNotification(message, type = 'success') {
        // Create and show notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    redirect(url) {
        window.location.href = url;
    }
}

// Initialize the app
const app = new BridgeApp();

// Export for use in other files
window.BridgeApp = app;
