document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. VARIABLES
    // ==========================================
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('login-email');
    const passInput = document.getElementById('login-pass');
    const errorMsg = document.getElementById('error-msg');
    
    // ==========================================
    // 2. HELPER: SHOW ERROR
    // ==========================================
    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.style.display = "block";
        // Shake animation for visual feedback
        loginForm.classList.add('shake');
        setTimeout(() => loginForm.classList.remove('shake'), 500);
    }

    // ==========================================
    // 3. LOGIN LOGIC
    // ==========================================
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const inputEmail = emailInput.value;
        const inputPass = passInput.value;
        
        // Retrieve stored user data
        const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

        // Check Credentials
        if (storedUser && inputEmail === storedUser.email && inputPass === storedUser.password) {
            
            // SUCCESS
            localStorage.setItem('isLoggedIn', 'true');
            
            // Optional: Loading effect on button
            const btn = document.querySelector('.btn-login');
            btn.innerHTML = 'Signing In...';
            btn.style.opacity = '0.8';

            setTimeout(() => {
                window.location.href = "index.html";
            }, 800); // Small delay for UX

        } else {
            
            // FAILURE
            showError("Incorrect email or password. Please try again.");
            passInput.value = ""; // Clear password
            passInput.focus();
        }
    });

    // ==========================================
    // 4. GHOST EYE TOGGLE
    // ==========================================
    const eyeIcon = document.querySelector('.toggle-password');
    
    if (eyeIcon) {
        // Prevent focus loss when clicking icon
        eyeIcon.addEventListener('mousedown', (e) => e.preventDefault());

        eyeIcon.addEventListener('click', function() {
            const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passInput.setAttribute('type', type);

            // Toggle color
            if (type === 'text') {
                this.style.color = "#16a085"; // Teal
                this.style.opacity = "1";     // Force visible
            } else {
                this.style.color = "#999";    // Gray
            }
        });
    }
});