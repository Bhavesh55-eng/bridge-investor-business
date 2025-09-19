// Dashboard Management
class DashboardManager {
    constructor() {
        this.currentUser = this.getCurrentUser();
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupForms();
        this.loadUserData();
        this.loadDashboardData();
    }

    getCurrentUser() {
        const userData = localStorage.getItem('bridgeUser');
        return userData ? JSON.parse(userData) : null;
    }

    setupNavigation() {
        // Handle sidebar navigation
        document.querySelectorAll('.sidebar nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.getAttribute('data-section');
                if (section) {
                    this.showSection(section);
                    this.updateActiveNavItem(e.target);
                }
            });
        });
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    }

    updateActiveNavItem(activeLink) {
        // Remove active class from all nav items
        document.querySelectorAll('.sidebar nav a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked item
        activeLink.classList.add('active');
    }

    setupForms() {
        // Business Idea Form
        const ideaForm = document.getElementById('ideaForm');
        if (ideaForm) {
            ideaForm.addEventListener('submit', (e) => this.handleIdeaSubmission(e));
        }

        // Investment Opportunity Form
        const opportunityForm = document.getElementById('opportunityForm');
        if (opportunityForm) {
            opportunityForm.addEventListener('submit', (e) => this.handleOpportunitySubmission(e));
        }

        // Loan Form
        const loanForm = document.getElementById('loanForm');
        if (loanForm) {
            loanForm.addEventListener('submit', (e) => this.handleLoanSubmission(e));
        }

        // Info Form (Advisor)
        const infoForm = document.getElementById('infoForm');
        if (infoForm) {
            infoForm.addEventListener('submit', (e) => this.handleInfoSubmission(e));
        }

        // Profile Form
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => this.handleProfileUpdate(e));
        }
    }

    async handleIdeaSubmission(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const ideaData = {
            title: formData.get('ideaTitle'),
            category: formData.get('ideaCategory'),
            description: formData.get('ideaDescription'),
            fundingRequired: formData.get('fundingRequired'),
            businessStage: formData.get('businessStage'),
            userId: this.currentUser.email,
            createdAt: new Date().toISOString()
        };

        try {
            // TODO: Save to Firebase
            console.log('Submitting idea:', ideaData);
            alert('Business idea posted successfully!');
            e.target.reset();
            this.showSection('my-ideas');
        } catch (error) {
            console.error('Error submitting idea:', error);
            alert('Error posting idea. Please try again.');
        }
    }

    async handleOpportunitySubmission(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const opportunityData = {
            title: formData.get('opportunityTitle'),
            investmentAmount: formData.get('investmentAmount'),
            preferredSectors: formData.getAll('preferredSectors'),
            investmentTerms: formData.get('investmentTerms'),
            expectedReturns: formData.get('expectedReturns'),
            userId: this.currentUser.email,
            createdAt: new Date().toISOString()
        };

        try {
            console.log('Submitting opportunity:', opportunityData);
            alert('Investment opportunity posted successfully!');
            e.target.reset();
        } catch (error) {
            console.error('Error submitting opportunity:', error);
            alert('Error posting opportunity. Please try again.');
        }
    }

    async handleLoanSubmission(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const loanData = {
            loanType: formData.get('loanType'),
            loanAmount: formData.get('loanAmount'),
            interestRate: formData.get('interestRate'),
            loanTenure: formData.get('loanTenure'),
            eligibilityCriteria: formData.get('eligibilityCriteria'),
            requiredDocuments: formData.get('requiredDocuments'),
            processingFee: formData.get('processingFee'),
            userId: this.currentUser.email,
            createdAt: new Date().toISOString()
        };

        try {
            console.log('Submitting loan product:', loanData);
            alert('Loan product posted successfully!');
            e.target.reset();
        } catch (error) {
            console.error('Error submitting loan:', error);
            alert('Error posting loan product. Please try again.');
        }
    }

    async handleInfoSubmission(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const infoData = {
            title: formData.get('infoTitle'),
            category: formData.get('infoCategory'),
            content: formData.get('infoContent'),
            tags: formData.get('tags').split(',').map(tag => tag.trim()),
            userId: this.currentUser.email,
            createdAt: new Date().toISOString()
        };

        try {
            console.log('Submitting advisory info:', infoData);
            alert('Information posted successfully!');
            e.target.reset();
        } catch (error) {
            console.error('Error submitting info:', error);
            alert('Error posting information. Please try again.');
        }
    }

    async handleProfileUpdate(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const profileData = {
            fullName: formData.get('profileName'),
            phone: formData.get('profilePhone'),
            bio: formData.get('profileBio')
        };

        try {
            console.log('Updating profile:', profileData);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile. Please try again.');
        }
    }

    loadUserData() {
        if (this.currentUser) {
            // Update user name in header
            const userNameElement = document.getElementById('userName');
            if (userNameElement) {
                userNameElement.textContent = `Welcome, ${this.currentUser.fullName || 'User'}`;
            }

            // Pre-fill profile form
            const profileEmail = document.getElementById('profileEmail');
            if (profileEmail) {
                profileEmail.value = this.currentUser.email;
            }
        }
    }

    async loadDashboardData() {
        // Load dashboard-specific data based on user type
        // This will be implemented with Firebase integration
        console.log('Loading dashboard data for:', this.currentUser?.userType);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new DashboardManager();
    
    // Make showSection globally available
    window.showSection = (sectionId) => dashboard.showSection(sectionId);
});
