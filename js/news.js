// Space News Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.getElementById('news-container');
    const newsSearchInput = document.getElementById('news-search');
    const newsSearchBtn = document.getElementById('news-search-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    
    // News API settings
    const articlesPerPage = 9;
    let currentPage = 1;
    let totalPages = 1;
    let currentFilter = 'all';
    let currentSearch = '';
    
    // Initial news load
    if (newsContainer) {
        fetchSpaceNews();
    }
    
    // Search functionality
    if (newsSearchBtn && newsSearchInput) {
        newsSearchBtn.addEventListener('click', function() {
            currentSearch = newsSearchInput.value.trim();
            currentPage = 1;
            fetchSpaceNews();
        });
        
        newsSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                currentSearch = newsSearchInput.value.trim();
                currentPage = 1;
                fetchSpaceNews();
            }
        });
    }
    
    // Filter buttons
    if (filterButtons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Update filter and fetch news
                currentFilter = this.getAttribute('data-filter');
                currentPage = 1;
                fetchSpaceNews();
            });
        });
    }
    
    // Pagination
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                fetchSpaceNews();
            }
        });
    }
    
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                fetchSpaceNews();
            }
        });
    }
    
    // Fetch space news from API
    async function fetchSpaceNews() {
        if (!newsContainer) return;
        
        newsContainer.innerHTML = '<div class="loading-spinner"></div>';
        
        try {
            // Build query parameters
            let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=${articlesPerPage}&_start=${(currentPage - 1) * articlesPerPage}`;
            
            // Add search term if provided
            if (currentSearch) {
                url += `&title_contains=${encodeURIComponent(currentSearch)}`;
            }
            
            // Add filter if not 'all'
            if (currentFilter !== 'all') {
                url += `&categories_contains=${encodeURIComponent(currentFilter)}`;
            }
            
            // Fetch articles
            const articlesResponse = await fetch(url);
            const articles = await articlesResponse.json();
            
            // Fetch total count for pagination
            const countUrl = url.replace(`_limit=${articlesPerPage}&_start=${(currentPage - 1) * articlesPerPage}`, '_limit=0');
            const countResponse = await fetch(countUrl);
            const totalCount = parseInt(countResponse.headers.get('x-total-count') || '0');
            
            totalPages = Math.ceil(totalCount / articlesPerPage);
            
            // Update pagination UI
            if (pageInfo) {
                pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
            }
            
            if (prevPageBtn) {
                prevPageBtn.disabled = currentPage <= 1;
            }
            
            if (nextPageBtn) {
                nextPageBtn.disabled = currentPage >= totalPages;
            }
            
            // Display articles
            if (articles.length === 0) {
                newsContainer.innerHTML = '<p class="no-results">No news articles found matching your criteria.</p>';
                return;
            }
            
            let newsHTML = '';
            
            articles.forEach(article => {
                const publishDate = new Date(article.publishedAt);
                const formattedDate = publishDate.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                });
                
                newsHTML += `
                    <div class="news-article">
                        <div class="news-article-image">
                            <img src="${article.imageUrl}" alt="${article.title}">
                        </div>
                        <div class="news-article-content">
                            <div class="news-article-date">${formattedDate}</div>
                            <h3 class="news-article-title">${article.title}</h3>
                            <p class="news-article-summary">${truncateText(article.summary, 200)}</p>
                            <a href="${article.url}" target="_blank" class="news-article-link">Read Full Article</a>
                        </div>
                    </div>
                `;
            });
            
            newsContainer.innerHTML = newsHTML;
            
        } catch (error) {
            console.error('Error fetching space news:', error);
            newsContainer.innerHTML = '<p class="error-message">Failed to load space news. Please try again later.</p>';
        }
    }
    
    // Helper function to truncate text
    function truncateText(text, maxLength) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
});