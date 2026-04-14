
document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = formattedDate;
    }
    
    const searchBtn = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    
    if (searchBtn && searchInput) {
        const executeSearch = () => {
            const query = searchInput.value.trim();
            if (query !== '') {
                // Redirect to news page with query parameter
                window.location.href = `pages/news.html?search=${encodeURIComponent(query)}`;
            }
        };
        
        searchBtn.addEventListener('click', executeSearch);
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                executeSearch();
            }
        });
    }
});

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 50);

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (!href || this.target === '_blank' || href.startsWith('#') || href.startsWith('http')) return;
            
            e.preventDefault();
            document.body.classList.remove('loaded');
            document.body.classList.add('exiting');
            
            setTimeout(() => {
                window.location.href = href;
            }, 400); 
        });
    });
});