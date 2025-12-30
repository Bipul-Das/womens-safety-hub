document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. VARIABLES
    // ==========================================
    const sosBtn = document.getElementById('sos-btn');
    const statusText = document.querySelector('#location-status span');
    const supportForm = document.getElementById('support-form');

    // ==========================================
    // 2. SOS / LOCATION LOGIC
    // ==========================================
    if (sosBtn) {
        sosBtn.addEventListener('click', () => {
            
            // A. Check Auth
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            
            if (isLoggedIn !== 'true') {
                alert("Please log in to use the SOS Alert feature.");
                window.location.href = "login.html";
                return;
            }

            // B. Simulate Sending Process
            sosBtn.disabled = true;
            sosBtn.style.backgroundColor = "#95a5a6"; // Gray out
            sosBtn.innerHTML = "📡 ACQUIRING GPS...";
            statusText.innerText = "Triangulating coordinates...";
            statusText.style.color = "#e67e22"; // Orange

            // Simulate Network Delay (2 seconds)
            setTimeout(() => {
                sosBtn.innerHTML = "📤 SENDING ALERTS...";
                statusText.innerText = "Broadcasting to 3 contacts...";
                
                // Simulate Success (2 more seconds)
                setTimeout(() => {
                    sosBtn.innerHTML = "✅ ALERT SENT";
                    sosBtn.style.backgroundColor = "#27ae60"; // Green
                    statusText.innerText = "Location shared successfully.";
                    statusText.style.color = "#27ae60";

                    // Reset button after 5 seconds
                    setTimeout(() => {
                        sosBtn.disabled = false;
                        sosBtn.innerHTML = "⚠️ SEND SOS ALERT";
                        sosBtn.style.backgroundColor = ""; // Revert to CSS default (Red)
                        statusText.innerText = "Waiting for action...";
                        statusText.style.color = "";
                    }, 5000);

                }, 2000);
            }, 2000);
        });
    }

    // ==========================================
    // 3. CONTACT FORM LOGIC
    // ==========================================
    if (supportForm) {
        supportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = supportForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = "Sending...";
            btn.style.opacity = "0.7";

            setTimeout(() => {
                btn.innerText = "Message Sent ✓";
                btn.style.backgroundColor = "#27ae60";
                supportForm.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = "";
                    btn.style.opacity = "1";
                }, 3000);
            }, 1500);
        });
    }
});