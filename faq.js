document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. ACCORDION LOGIC
    // ==========================================
    const questions = document.querySelectorAll('.faq-question');

    questions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');

            // Optional: Close others
            // document.querySelectorAll('.faq-item').forEach(other => {
            //     if(other !== item) {
            //         other.classList.remove('active');
            //         other.querySelector('.faq-answer').style.maxHeight = null;
            //     }
            // });

            // Toggle Current
            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // ==========================================
    // 2. SEARCH FILTER LOGIC
    // ==========================================
    const searchInput = document.getElementById('faq-search');
    const faqItems = document.querySelectorAll('.faq-item');
    const categories = document.querySelectorAll('.faq-category-title');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();

            faqItems.forEach(item => {
                const questionText = item.querySelector('.faq-question span').innerText.toLowerCase();
                const answerText = item.querySelector('.faq-answer p').innerText.toLowerCase();

                if (questionText.includes(term) || answerText.includes(term)) {
                    item.style.display = "block";
                    // If matched, maybe highlight? (Advanced feature omitted for simplicity)
                } else {
                    item.style.display = "none";
                }
            });

            // Optional: Hide category titles if all items under them are hidden
            // (Requires complex DOM traversal, skipped for stability)
        });
    }

});