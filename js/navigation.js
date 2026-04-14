
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    }
    
    document.addEventListener('click', function(event) {
        if (mobileMenu && mobileMenu.classList.contains('open') && !mobileMenu.contains(event.target) && event.target !== menuBtn) {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
    });
    
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