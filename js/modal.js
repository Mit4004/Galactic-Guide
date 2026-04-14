
document.addEventListener('DOMContentLoaded', function() {
    const modals = document.querySelectorAll('.modal');
    
    const closeButtons = document.querySelectorAll('.close-button');
    
    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        }
    }
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    closeModal(modal);
                }
            });
        }
    });
    
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    };
});