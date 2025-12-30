document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. ACCORDION LOGIC
    // ==========================================
    const headers = document.querySelectorAll('.right-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.right-content');

            // Close other items (Optional: remove this if you want multiple open)
            document.querySelectorAll('.right-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.right-content').style.maxHeight = null;
                }
            });

            // Toggle Current
            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });


    // ==========================================
    // 2. SEARCH FILTER LOGIC
    // ==========================================
    const searchInput = document.getElementById('rights-search');
    const items = document.querySelectorAll('.right-item');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchText = e.target.value.toLowerCase();
            let hasResults = false;

            items.forEach(item => {
                const title = item.querySelector('.header-title').innerText.toLowerCase();
                const content = item.querySelector('.right-content').innerText.toLowerCase();

                // Check if search matches title OR content
                if (title.includes(searchText) || content.includes(searchText)) {
                    item.style.display = "block";
                    hasResults = true;
                } else {
                    item.style.display = "none";
                }
            });
            
            // Note: In a real app, you might want to show a "No results found" message here
        });
    }

});