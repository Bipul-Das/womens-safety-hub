document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SELECTORS
    // ==========================================
    const darkModeToggle = document.getElementById('toggle-darkmode');
    const sosToggle = document.getElementById('toggle-sos');
    const emailToggle = document.getElementById('toggle-email');
    const locationToggle = document.getElementById('toggle-location');
    const incognitoToggle = document.getElementById('toggle-incognito');
    const languageSelect = document.getElementById('language-select');
    const deleteBtn = document.getElementById('delete-account-btn');

    // ==========================================
    // 2. LOAD SAVED PREFERENCES
    // ==========================================
    const settings = JSON.parse(localStorage.getItem('appSettings')) || {
        darkMode: false,
        sosAlerts: true,
        emailNotifs: true,
        locationSharing: true,
        incognito: false,
        language: 'en'
    };

    // Apply values to UI
    if(darkModeToggle) darkModeToggle.checked = settings.darkMode;
    if(sosToggle) sosToggle.checked = settings.sosAlerts;
    if(emailToggle) emailToggle.checked = settings.emailNotifs;
    if(locationToggle) locationToggle.checked = settings.locationSharing;
    if(incognitoToggle) incognitoToggle.checked = settings.incognito;
    if(languageSelect) languageSelect.value = settings.language;

    // Apply Dark Mode immediately if true
    if (settings.darkMode) {
        document.body.classList.add('dark-mode');
    }

    // ==========================================
    // 3. EVENT LISTENERS (Save on Change)
    // ==========================================
    
    function saveSettings() {
        const newSettings = {
            darkMode: darkModeToggle.checked,
            sosAlerts: sosToggle.checked,
            emailNotifs: emailToggle.checked,
            locationSharing: locationToggle.checked,
            incognito: incognitoToggle.checked,
            language: languageSelect.value
        };
        localStorage.setItem('appSettings', JSON.stringify(newSettings));
        console.log("Settings Saved:", newSettings);
    }

    // Dark Mode Logic
    if(darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
            saveSettings();
        });
    }

    // Generic Toggles
    [sosToggle, emailToggle, locationToggle, incognitoToggle, languageSelect].forEach(el => {
        if(el) {
            el.addEventListener('change', saveSettings);
        }
    });

    // ==========================================
    // 4. DANGER ZONE: DELETE ACCOUNT
    // ==========================================
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            const confirm1 = confirm("⚠️ Are you sure you want to delete your account? This action cannot be undone.");
            
            if (confirm1) {
                const confirm2 = confirm("All your saved contacts, settings, and personal data will be erased immediately. Confirm deletion?");
                
                if (confirm2) {
                    // Perform Deletion
                    localStorage.clear(); // Wipes everything
                    alert("Account deleted successfully.");
                    window.location.href = "index.html";
                }
            }
        });
    }

});