document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // FORM SUBMISSION LOGIC
    // ==========================================
    const contactForm = document.getElementById('contact-us-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            // 1. Simulate Network Request
            btn.innerText = "Sending Message...";
            btn.style.opacity = "0.7";
            btn.disabled = true;

            setTimeout(() => {
                // 2. Success State
                btn.innerText = "Message Sent Successfully ✓";
                btn.style.backgroundColor = "#27ae60"; // Success Green
                btn.style.opacity = "1";

                // 3. Clear Form
                contactForm.reset();

                // 4. Reset Button after delay
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = ""; // Revert to CSS default
                    btn.disabled = false;
                }, 3000);

            }, 1500); // 1.5 second delay
        });
    }

});