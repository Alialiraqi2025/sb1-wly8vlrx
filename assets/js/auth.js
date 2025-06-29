// Authentication controller
class AuthController {
    constructor() {
        this.isLogin = true;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('auth-form').addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Toggle between login/register
        document.getElementById('auth-switch').addEventListener('click', () => this.toggleAuthMode());
        
        // Password visibility toggle
        document.getElementById('toggle-password').addEventListener('click', () => this.togglePasswordVisibility());
    }

    toggleAuthMode() {
        this.isLogin = !this.isLogin;
        
        const title = document.getElementById('auth-title');
        const subtitle = document.getElementById('auth-subtitle');
        const nameField = document.getElementById('name-field');
        const submitBtn = document.getElementById('auth-submit');
        const switchText = document.getElementById('auth-switch-text');
        const switchBtn = document.getElementById('auth-switch');

        if (this.isLogin) {
            title.textContent = 'Welcome Back';
            subtitle.textContent = 'Sign in to continue messaging securely';
            nameField.classList.add('hidden');
            submitBtn.innerHTML = '<i class="fas fa-comments"></i><span>Sign In</span>';
            switchText.textContent = "Don't have an account?";
            switchBtn.textContent = 'Sign up here';
        } else {
            title.textContent = 'Create Account';
            subtitle.textContent = 'Join the secure messaging platform';
            nameField.classList.remove('hidden');
            submitBtn.innerHTML = '<i class="fas fa-user-plus"></i><span>Create Account</span>';
            switchText.textContent = 'Already have an account?';
            switchBtn.textContent = 'Sign in here';
        }
    }

    togglePasswordVisibility() {
        const passwordInput = document.getElementById('password');
        const toggleBtn = document.getElementById('toggle-password');
        const icon = toggleBtn.querySelector('i');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            passwordInput.type = 'password';
            icon.className = 'fas fa-eye';
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value;

        // Basic validation
        if (!email || !password) {
            this.showError('Please fill in all required fields');
            return;
        }

        if (!this.isLogin && !name) {
            this.showError('Please enter your full name');
            return;
        }

        if (!this.validateEmail(email)) {
            this.showError('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            this.showError('Password must be at least 6 characters long');
            return;
        }

        // Show loading state
        const submitBtn = document.getElementById('auth-submit');
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>';
        submitBtn.disabled = true;

        try {
            if (this.isLogin) {
                await this.login(email, password);
            } else {
                await this.register(name, email, password);
            }
        } catch (error) {
            this.showError(error.message);
        } finally {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        }
    }

    async login(email, password) {
        // Simulate API call
        await this.delay(1500);

        // For demo purposes, accept any email/password
        const userData = {
            id: 'user_' + Date.now(),
            name: email.split('@')[0],
            email: email,
            avatar: email.charAt(0).toUpperCase()
        };

        // Initialize encryption for user
        if (window.encryptionService) {
            window.encryptionService.generateUserKeys(userData.id);
        }

        // Login successful
        window.app.login(userData);
    }

    async register(name, email, password) {
        // Simulate API call
        await this.delay(2000);

        const userData = {
            id: 'user_' + Date.now(),
            name: name,
            email: email,
            avatar: name.charAt(0).toUpperCase()
        };

        // Initialize encryption for user
        if (window.encryptionService) {
            window.encryptionService.generateUserKeys(userData.id);
        }

        // Registration successful, auto-login
        window.app.login(userData);
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showError(message) {
        // Remove existing error
        const existingError = document.querySelector('.auth-error');
        if (existingError) {
            existingError.remove();
        }

        // Create error element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'auth-error bg-red-50 border border-red-200 rounded-2xl p-4 mb-4';
        errorDiv.innerHTML = `
            <div class="flex items-center space-x-2 text-red-600">
                <i class="fas fa-exclamation-circle"></i>
                <span class="text-sm font-medium">${message}</span>
            </div>
        `;

        // Insert before form
        const form = document.getElementById('auth-form');
        form.parentNode.insertBefore(errorDiv, form);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize auth controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.authController = new AuthController();
});