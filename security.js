document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. AUTH CHECK
    // ==========================================
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // ==========================================
    // 2. PASSWORD STRENGTH METER
    // ==========================================
    const newPassInput = document.getElementById('new-pass');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');

    if (newPassInput) {
        newPassInput.addEventListener('input', function() {
            const val = this.value;
            let strength = 0;
            let color = '#eee';
            let text = 'Password Strength: Weak';

            if (val.length > 5) strength += 20;
            if (val.length > 8) strength += 20;
            if (/[A-Z]/.test(val)) strength += 20;
            if (/[0-9]/.test(val)) strength += 20;
            if (/[^A-Za-z0-9]/.test(val)) strength += 20;

            if (strength <= 40) {
                color = '#e74c3c'; // Red
                text = 'Password Strength: Weak';
            } else if (strength <= 80) {
                color = '#f39c12'; // Orange
                text = 'Password Strength: Medium';
            } else {
                color = '#27ae60'; // Green
                text = 'Password Strength: Strong';
            }

            strengthBar.style.width = strength + '%';
            strengthBar.style.backgroundColor = color;
            strengthText.innerText = text;
            strengthText.style.color = color;
        });
    }

    // ==========================================
    // 3. CHANGE PASSWORD FORM
    // ==========================================
    const passForm = document.getElementById('password-form');
    if (passForm) {
        passForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = passForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = "Updating...";
            btn.style.opacity = "0.7";

            setTimeout(() => {
                btn.innerText = "Password Updated ✓";
                btn.style.backgroundColor = "#27ae60";
                passForm.reset();
                strengthBar.style.width = '0%';
                strengthText.innerText = "";

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = "";
                    btn.style.opacity = "1";
                }, 2000);
            }, 1500);
        });
    }

    // ==========================================
    // 4. 2FA TOGGLE
    // ==========================================
    const btn2fa = document.getElementById('toggle-2fa-btn');
    const status2fa = document.getElementById('2fa-status');
    let is2faEnabled = false;

    if (btn2fa) {
        btn2fa.addEventListener('click', () => {
            is2faEnabled = !is2faEnabled;

            if (is2faEnabled) {
                status2fa.innerText = "Status: ON";
                status2fa.className = "status-badge on";
                btn2fa.innerText = "Disable 2FA";
                btn2fa.style.borderColor = "#e74c3c";
                btn2fa.style.color = "#e74c3c";
            } else {
                status2fa.innerText = "Status: OFF";
                status2fa.className = "status-badge off";
                btn2fa.innerText = "Enable 2FA";
                btn2fa.style.borderColor = "";
                btn2fa.style.color = "";
            }
        });
    }

    // ==========================================
    // 5. REVOKE DEVICE
    // ==========================================
    window.revokeDevice = (deviceId) => {
        if(confirm("Are you sure you want to log out of this device?")) {
            const deviceElement = document.getElementById(deviceId);
            if(deviceElement) {
                deviceElement.style.opacity = "0.5";
                deviceElement.innerHTML = "<p style='color:#e74c3c; padding:10px;'>Logging out...</p>";
                
                setTimeout(() => {
                    deviceElement.remove();
                }, 1000);
            }
        }
    };

});