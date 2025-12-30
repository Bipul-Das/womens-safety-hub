document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. STATE MANAGEMENT (Dummy Data for first run)
    // ==========================================
    const DEFAULT_CONTACTS = [
        { id: '1', name: 'Mom', relation: 'Parent', phone: '+1 555 0101', isPrimary: true },
        { id: '2', name: 'John (Brother)', relation: 'Sibling', phone: '+1 555 0202', isPrimary: false }
    ];

    // Load from Storage or use Defaults
    let contacts = JSON.parse(localStorage.getItem('myContacts')) || DEFAULT_CONTACTS;

    // DOM Elements
    const grid = document.getElementById('contacts-grid');
    const modal = document.getElementById('contact-modal');
    const form = document.getElementById('contact-form');
    const addBtn = document.getElementById('add-new-btn');
    const closeBtn = document.getElementById('close-modal');
    const cancelBtn = document.getElementById('cancel-btn');

    // ==========================================
    // 2. RENDER FUNCTIONS
    // ==========================================
    function renderContacts() {
        grid.innerHTML = ''; // Clear grid

        if (contacts.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 40px; color:#666;">
                <h3>No contacts added yet.</h3>
                <p>Click "Add New Contact" to ensure you are safe.</p>
            </div>`;
            return;
        }

        // Sort: Primary first
        contacts.sort((a, b) => (a.isPrimary === b.isPrimary) ? 0 : a.isPrimary ? -1 : 1);

        contacts.forEach(contact => {
            const card = document.createElement('div');
            card.classList.add('contact-card');
            if (contact.isPrimary) card.classList.add('primary');

            const initial = contact.name.charAt(0).toUpperCase();
            const badge = contact.isPrimary ? '<span class="badge-primary">Primary</span>' : '';

            card.innerHTML = `
                <div class="card-header">
                    <div class="avatar-initial">${initial}</div>
                    ${badge}
                </div>
                <div class="card-info">
                    <h3>${contact.name}</h3>
                    <span class="relation">${contact.relation}</span>
                    <p>📞 ${contact.phone}</p>
                </div>
                <div class="card-actions">
                    <button class="action-icon-btn btn-call" onclick="callContact('${contact.phone}')" title="Call">📞 Call</button>
                    <button class="action-icon-btn btn-msg" onclick="msgContact('${contact.name}')" title="Message">💬 Text</button>
                    <button class="action-icon-btn" onclick="editContact('${contact.id}')" title="Edit">✏️</button>
                    <button class="action-icon-btn btn-delete" onclick="deleteContact('${contact.id}')" title="Delete">🗑️</button>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // ==========================================
    // 3. MODAL LOGIC
    // ==========================================
    function openModal(isEdit = false, id = null) {
        modal.style.display = 'flex';
        document.getElementById('error-msg')?.remove(); // Clear prev errors
        
        if (isEdit && id) {
            const contact = contacts.find(c => c.id === id);
            document.getElementById('modal-title').innerText = "Edit Contact";
            document.getElementById('contact-id').value = contact.id;
            document.getElementById('c-name').value = contact.name;
            document.getElementById('c-relation').value = contact.relation;
            document.getElementById('c-phone').value = contact.phone;
            document.getElementById('c-primary').checked = contact.isPrimary;
        } else {
            document.getElementById('modal-title').innerText = "Add New Contact";
            form.reset();
            document.getElementById('contact-id').value = '';
        }
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    addBtn.addEventListener('click', () => openModal(false));
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // ==========================================
    // 4. FORM HANDLING (Add/Edit)
    // ==========================================
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = document.getElementById('contact-id').value;
        const name = document.getElementById('c-name').value;
        const relation = document.getElementById('c-relation').value;
        const phone = document.getElementById('c-phone').value;
        const isPrimary = document.getElementById('c-primary').checked;

        // If new primary selected, uncheck others
        if (isPrimary) {
            contacts.forEach(c => c.isPrimary = false);
        }

        if (id) {
            // UPDATE EXISTING
            const index = contacts.findIndex(c => c.id === id);
            contacts[index] = { id, name, relation, phone, isPrimary };
        } else {
            // CREATE NEW
            const newId = Date.now().toString();
            contacts.push({ id: newId, name, relation, phone, isPrimary });
        }

        // Save & Render
        localStorage.setItem('myContacts', JSON.stringify(contacts));
        renderContacts();
        closeModal();
    });

    // ==========================================
    // 5. GLOBAL FUNCTIONS (Exposed to HTML)
    // ==========================================
    
    window.editContact = (id) => {
        openModal(true, id);
    };

    window.deleteContact = (id) => {
        if (confirm('Are you sure you want to remove this contact?')) {
            contacts = contacts.filter(c => c.id !== id);
            localStorage.setItem('myContacts', JSON.stringify(contacts));
            renderContacts();
        }
    };

    window.callContact = (phone) => {
        window.location.href = `tel:${phone}`;
    };

    window.msgContact = (name) => {
        const btn = event.currentTarget; // Get the button clicked
        const originalText = btn.innerHTML;
        
        btn.innerHTML = "Sending...";
        btn.style.color = "#3498db";
        
        setTimeout(() => {
            alert(`Test Alert sent to ${name}: "I am testing my SafetyHub app."`);
            btn.innerHTML = "Sent ✓";
            
            setTimeout(() => {
                btn.innerHTML = originalText; // Reset
            }, 2000);
        }, 800);
    };

    // Initial Render
    renderContacts();
});