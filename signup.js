document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. VARIABLES
    // ==========================================
    const signupForm = document.getElementById('signup-form');
    const emailInput = document.getElementById('signup-email');
    const passInput = document.getElementById('signup-pass');
    const confirmPassInput = document.getElementById('signup-confirm-pass');
    const errorMsg = document.getElementById('error-msg');
    
    // ==========================================
    // 2. HELPER: SHOW ERROR
    // ==========================================
    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.style.display = "block";
        // Shake animation for visual feedback
        signupForm.classList.add('shake');
        // We assume 'shake' animation is defined in CSS or inherited, 
        // if not, it just won't shake but error shows.
    }

    // ==========================================
    // 3. SIGNUP LOGIC
    // ==========================================
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = emailInput.value;
            const pass = passInput.value;
            const confirmPass = confirmPassInput.value;

            // 1. CHECK: Does User Already Exist?
            const existingUser = JSON.parse(localStorage.getItem('registeredUser'));
            
            if (existingUser && existingUser.email === email) {
                showError("An account with this email address already exists. Please log in.");
                return;
            }

            // 2. CHECK: Passwords Match
            if (pass !== confirmPass) {
                showError("Passwords do not match. Please try again.");
                // Clear confirm field
                confirmPassInput.value = "";
                return;
            }

            // 3. CHECK: Simple Strength (Optional but professional)
            if (pass.length < 6) {
                showError("Password must be at least 6 characters long.");
                return;
            }

            // 4. CREATE USER
            const user = {
                email: email,
                password: pass
            };

            // Save to Local Storage
            localStorage.setItem('registeredUser', JSON.stringify(user));
            
            // Auto Login
            localStorage.setItem('isLoggedIn', 'true');
            
            // Visual Feedback
            const btn = document.querySelector('.btn-signup');
            btn.innerHTML = 'Creating Account...';
            btn.style.opacity = '0.8';

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        });
    }

    // ==========================================
    // 4. GHOST EYE TOGGLE (Handles Multiple Eyes)
    // ==========================================
    const toggleIcons = document.querySelectorAll('.toggle-password');

    toggleIcons.forEach(icon => {
        // Prevent focus loss
        icon.addEventListener('mousedown', (e) => e.preventDefault());

        icon.addEventListener('click', function() {
            // Find the input strictly associated with this specific icon
            const input = this.previousElementSibling;

            if (input) {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);

                if (type === 'text') {
                    this.style.color = "#16a085"; // Teal
                    this.style.opacity = "1";
                } else {
                    this.style.color = "#999";    // Gray
                    // Note: In CSS opacity goes back to 0 on blur, 
                    // but we keep opacity 1 if user is still focused.
                }
            }
        });
    });
});