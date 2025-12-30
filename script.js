// ==========================================
// 1. GLOBAL VARIABLES & SAFETY
// ==========================================
const quickExitBtn = document.getElementById('quick-exit');

function triggerQuickExit() {
    window.open("https://www.google.com", "_blank");
    window.location.replace("https://www.google.com");
}

if (quickExitBtn) {
    quickExitBtn.addEventListener('click', triggerQuickExit);
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") triggerQuickExit();
});


// ==========================================
// 2. HELPER FUNCTIONS (Error Box used in Auth pages)
// ==========================================
const errorMsg = document.getElementById('error-msg'); 

function showError(message) {
    if (errorMsg) {
        errorMsg.textContent = message;
        errorMsg.style.display = "block"; 
    }
}


// ==========================================
// 3. AUTHENTICATION (Login/Signup Logic placeholders)
// ==========================================
// (Kept for compatibility with other pages, though not used on index)
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

if (signupForm) { /* ... signup logic ... */ }
if (loginForm) { /* ... login logic ... */ }


// ==========================================
// 4. NAVBAR & DROPDOWN MENU
// ==========================================
const authLink = document.getElementById('auth-link');

if (authLink) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUser = JSON.parse(localStorage.getItem('registeredUser'));
    const profilePic = localStorage.getItem('profilePic');

    if (isLoggedIn === 'true' && storedUser) {
        // --- USER IS LOGGED IN ---
        authLink.innerHTML = ''; 
        authLink.href = "javascript:void(0)"; 
        // authLink.title = `Logged in as: ${storedUser.email}`; 

        const avatarCircle = document.createElement('div');
        avatarCircle.classList.add('nav-avatar');

        if (profilePic) {
            const img = document.createElement('img');
            img.src = profilePic; img.alt = "Profile";
            avatarCircle.appendChild(img);
        } else {
            avatarCircle.innerText = storedUser.email.charAt(0).toUpperCase();
        }
        
        authLink.appendChild(avatarCircle);

        const dropdownHtml = `
            <a href="account.html" class="dropdown-item">👤 My Account</a>
            <a href="emcon.html" class="dropdown-item">📞 Emergency Contacts</a>
            <a href="settings.html" class="dropdown-item">⚙️ Settings</a>
            <a href="index.html" class="dropdown-item logout-btn" id="logout-btn">🚪 Log Out</a>
        `;

        const dropdownDiv = document.createElement('div');
        dropdownDiv.classList.add('profile-dropdown');
        dropdownDiv.innerHTML = dropdownHtml;
        document.querySelector('.navbar').appendChild(dropdownDiv);

        authLink.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownDiv.classList.toggle('show-menu');
        });

        const logoutBtn = dropdownDiv.querySelector('#logout-btn');
        if(logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('isLoggedIn');
                window.location.reload(); 
            });
        }

        document.addEventListener('click', (event) => {
            if (!authLink.contains(event.target) && !dropdownDiv.contains(event.target)) {
                dropdownDiv.classList.remove('show-menu');
            }
        });

    } else {
        // --- USER IS NOT LOGGED IN ---
        authLink.textContent = "Login";
        authLink.href = "login.html";
    }
}

// ==========================================
// 5. NEW: FAQ ACCORDION LOGIC
// ==========================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        // Close other open FAQs (Optional: remove this block if you want multiple open)
        faqQuestions.forEach(item => {
            if (item !== question) {
                item.classList.remove('active');
                item.nextElementSibling.style.maxHeight = null;
            }
        });

        // Toggle current FAQ
        question.classList.toggle('active');
        const answer = question.nextElementSibling;
        
        if (question.classList.contains('active')) {
            // Set max-height to the scrollHeight (actual height of content)
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }
    });
});


// ==========================================
// 6. NEW: ACHIEVEMENTS COUNTER ANIMATION
// ==========================================
const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the slower

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            
            // Calculate increment step
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1); // Call again quickly for smooth animation
            } else {
                counter.innerText = target; // Ensure it ends on exact number
                // Optional: Add a '+' sign at the end
                // counter.innerText = target + '+'; 
            }
        };
        updateCount();
    });
}

// Trigger animation when the section scrolls into view (Intersection Observer)
const achievementsSection = document.querySelector('.achievements-section');

if (achievementsSection) {
    const observerOptions = {
        threshold: 0.5 // Trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    observer.observe(achievementsSection);
}
// Fallback: if IntersectionObserver fails or isn't supported, run on load
// else { animateCounters(); }