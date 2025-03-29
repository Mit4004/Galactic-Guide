// Navigation functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu elements
    const menuBtn = document.getElementById('menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Open mobile menu
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close mobile menu
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && mobileMenu.classList.contains('open') && !mobileMenu.contains(event.target) && event.target !== menuBtn) {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle navigation options on home page
    const options = document.querySelectorAll('.option[data-page]');
    options.forEach(option => {
        option.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            if (page) {
                window.location.href = `pages/${page}.html`;
            }
        });
    });
});