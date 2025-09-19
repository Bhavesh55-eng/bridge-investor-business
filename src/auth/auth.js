// Authentication handling
class AuthManager {
    constructor() {
        this.setupFormHandlers();
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
    }

    async handleRegister(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const userData = {
            userType: formData.get('userType'),
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };

        // Validate passwords match
        if (userData.password !== userData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Validate terms acceptance
        const agreeTerms = document.getElementById('agreeTerms').checked;
        if (!agreeTerms) {
            alert('Please accept the terms and conditions');
            return;
        }

        try {
            // For now, simulate registration (will integrate with Firebase later)
            console.log('Registering user:', userData);
            
            // Simulate successful registration
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
            
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const loginData = {
            email: formData.get('email'),
            password: formData.get('password'),
            rememberMe: document.getElementById('rememberMe').checked
        };

        try {
            // For now, simulate login (will integrate with Firebase later)
            console.log('Logging in user:', loginData.email);
            
            // Simulate successful login with different user types
            const mockUser = {
                email: loginData.email,
                userType: 'business', // This would come from Firebase
                fullName: 'John Doe'
            };

            // Save user data
            localStorage.setItem('bridgeUser', JSON.stringify(mockUser));
            
            // Redirect based on user type
            this.redirectToDashboard(mockUser.userType);
            
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please check your credentials.');
        }
    }

    redirectToDashboard(userType) {
        const dashboardMap = {
            'business': '../dashboards/business.html',
            'investor': '../dashboards/investor.html',
            'banker': '../dashboards/banker.html',
            'advisor': '../dashboards/advisor.html'
        };

        window.location.href = dashboardMap[userType] || '../dashboards/business.html';
    }

    logout() {
        localStorage.removeItem('bridgeUser');
        window.location.href = '../index.html';
    }
}

// Initialize auth manager
const authManager = new AuthManager();
