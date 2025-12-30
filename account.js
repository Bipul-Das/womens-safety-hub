document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. AUTH CHECK
    // ==========================================
    const storedUser = JSON.parse(localStorage.getItem('registeredUser'));
    if (!storedUser) {
        window.location.href = 'login.html';
        return;
    }

    // ==========================================
    // 2. LOAD DATA
    // ==========================================
    
    // Email Field (Read Only)
    const emailField = document.getElementById('display-email');
    if (emailField) emailField.value = storedUser.email;

    // General Info
    const generalData = JSON.parse(localStorage.getItem('generalInfo') || '{}');
    const nameDisplay = document.getElementById('profile-name-display');
    const fullNameInput = document.getElementById('full-name');

    // Name Logic
    if (generalData.fullName) {
        if (fullNameInput) fullNameInput.value = generalData.fullName;
        if (nameDisplay) nameDisplay.textContent = generalData.fullName;
    } else {
        if (nameDisplay) nameDisplay.textContent = storedUser.email.split('@')[0];
    }

    // Other Fields
    if (generalData.phone) document.getElementById('phone').value = generalData.phone;
    if (generalData.dob) document.getElementById('dob').value = generalData.dob;
    if (generalData.address) document.getElementById('address').value = generalData.address;
    if (generalData.bloodGroup) document.getElementById('blood-group').value = generalData.bloodGroup;

    // Contact Info
    const savedContacts = JSON.parse(localStorage.getItem('emergencyContacts') || '{}');
    if (savedContacts.c1Name) document.getElementById('contact-1-name').value = savedContacts.c1Name;
    if (savedContacts.c1Phone) document.getElementById('contact-1-phone').value = savedContacts.c1Phone;
    if (savedContacts.c2Name) document.getElementById('contact-2-name').value = savedContacts.c2Name;
    if (savedContacts.c2Phone) document.getElementById('contact-2-phone').value = savedContacts.c2Phone;
    if (savedContacts.c3Name) document.getElementById('contact-3-name').value = savedContacts.c3Name;
    if (savedContacts.c3Phone) document.getElementById('contact-3-phone').value = savedContacts.c3Phone;

    // ==========================================
    // 3. AVATAR LOGIC
    // ==========================================
    const largeAvatar = document.getElementById('profile-avatar-large');
    const deleteBtn = document.getElementById('delete-photo-btn');
    const uploadLabel = document.getElementById('upload-label');
    const photoInput = document.getElementById('photo-upload');

    function updateAvatarDisplay() {
        const savedPic = localStorage.getItem('profilePic');
        if (savedPic) {
            largeAvatar.innerHTML = `<img src="${savedPic}" alt="Profile">`;
            uploadLabel.innerText = "📸 Change";
            deleteBtn.style.display = 'inline-flex';
        } else {
            largeAvatar.innerText = storedUser.email.charAt(0).toUpperCase();
            uploadLabel.innerText = "📸 Upload Photo";
            deleteBtn.style.display = 'none';
        }
    }
    
    // Initialize Avatar
    updateAvatarDisplay();

    // Handle Upload
    if (photoInput) {
        photoInput.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                if (file.size > 2 * 1024 * 1024) {
                    alert("Image must be smaller than 2MB");
                    return;
                }
                const reader = new FileReader();
                reader.onload = function (e) {
                    localStorage.setItem('profilePic', e.target.result);
                    updateAvatarDisplay();
                    // Optional: Update navbar avatar without reload if script.js supports it
                    location.reload(); 
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Handle Delete
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            localStorage.removeItem('profilePic');
            updateAvatarDisplay();
            location.reload();
        });
    }

    // ==========================================
    // 4. FORM SUBMISSION LOGIC
    // ==========================================
    
    // Save General Info
    const generalForm = document.getElementById('general-form');
    if (generalForm) {
        generalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const info = {
                fullName: document.getElementById('full-name').value,
                phone: document.getElementById('phone').value,
                dob: document.getElementById('dob').value,
                address: document.getElementById('address').value,
                bloodGroup: document.getElementById('blood-group').value
            };
            
            localStorage.setItem('generalInfo', JSON.stringify(info));

            // Update Name Display Immediately
            if (nameDisplay) nameDisplay.textContent = info.fullName;

            // Button Feedback
            const btn = document.getElementById('save-general-btn');
            const originalText = btn.innerText;
            btn.innerText = "Saved ✓";
            btn.style.backgroundColor = "#27ae60"; // Success Green
            
            setTimeout(() => { 
                btn.innerText = originalText; 
                btn.style.backgroundColor = ""; // Reset to CSS default
            }, 2000);
        });
    }

    // Add Contact Button Logic
    const addContactBtn = document.getElementById('add-contact-btn');
    const extraContactDiv = document.getElementById('extra-contact-container');

    // Check if 3rd contact exists to show section on load
    if (savedContacts.c3Name || savedContacts.c3Phone) {
        if (extraContactDiv) extraContactDiv.style.display = 'block';
        if (addContactBtn) addContactBtn.style.display = 'none';
    }

    if (addContactBtn) {
        addContactBtn.addEventListener('click', () => {
            extraContactDiv.style.display = 'block';
            addContactBtn.style.display = 'none';
        });
    }

    // Save Emergency Contacts
    const emergencyForm = document.getElementById('emergency-form');
    if (emergencyForm) {
        emergencyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const contacts = {
                c1Name: document.getElementById('contact-1-name').value,
                c1Phone: document.getElementById('contact-1-phone').value,
                c2Name: document.getElementById('contact-2-name').value,
                c2Phone: document.getElementById('contact-2-phone').value,
                c3Name: document.getElementById('contact-3-name').value,
                c3Phone: document.getElementById('contact-3-phone').value
            };
            
            localStorage.setItem('emergencyContacts', JSON.stringify(contacts));

            // Button Feedback
            const btn = document.getElementById('save-contacts-btn');
            const originalText = btn.innerText;
            btn.innerText = "Updated ✓";
            btn.style.backgroundColor = "#27ae60";
            
            setTimeout(() => { 
                btn.innerText = originalText; 
                btn.style.backgroundColor = ""; 
            }, 2000);
        });
    }
});