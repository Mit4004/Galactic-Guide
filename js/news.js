
document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.getElementById('news-container');
    const newsSearchInput = document.getElementById('news-search');
    const newsSearchBtn = document.getElementById('news-search-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    
    const articlesPerPage = 9;
    let currentPage = 1;
    let totalPages = 1;
    let currentFilter = 'all';
    let currentSearch = '';
    
    // Check if there is a search query coming from the homepage
    const urlParams = new URLSearchParams(window.location.search);
    const incomingSearch = urlParams.get('search');
    if (incomingSearch) {
        currentSearch = incomingSearch;
        if (newsSearchInput) {
            newsSearchInput.value = incomingSearch;
        }
    }
    
    if (newsContainer) {
        fetchSpaceNews();
    }
    
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
    
    if (filterButtons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                currentFilter = this.getAttribute('data-filter');
                currentPage = 1;
                fetchSpaceNews();
            });
        });
    }
    
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
    
    async function fetchSpaceNews() {
        if (!newsContainer) return;
        
        newsContainer.innerHTML = '<div class="loading-spinner"></div>';
        
        try {
            let url = `https://api.spaceflightnewsapi.net/v4/articles/?limit=${articlesPerPage}&offset=${(currentPage - 1) * articlesPerPage}`;
            
            let searchQuery = '';
            if (currentSearch) {
                searchQuery += currentSearch;
            }
            
            if (currentFilter !== 'all') {
                searchQuery += (searchQuery ? ' ' : '') + currentFilter;
            }
            
            if (searchQuery) {
                url += `&search=${encodeURIComponent(searchQuery)}`;
            }
            
            const articlesResponse = await fetch(url);
            const data = await articlesResponse.json();
            const articles = data.results;
            
            let totalCount = data.count || 0;
            const maxPages = 3;
            if (totalCount > articlesPerPage * maxPages) {
                totalCount = articlesPerPage * maxPages;
            }
            
            totalPages = Math.ceil(totalCount / articlesPerPage);
            
            if (pageInfo) {
                pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
            }
            
            if (prevPageBtn) {
                prevPageBtn.disabled = currentPage <= 1;
            }
            
            if (nextPageBtn) {
                nextPageBtn.disabled = currentPage >= totalPages;
            }
            
            if (articles.length === 0) {
                newsContainer.innerHTML = '<p class="no-results">No news articles found matching your criteria.</p>';
                return;
            }
            
            let newsHTML = '';
            
            articles.forEach(article => {
                const publishDate = new Date(article.published_at);
                const formattedDate = publishDate.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                });
                
                newsHTML += `
                    <div class="news-article">
                        <div class="news-article-image">
                            <img src="${article.image_url}" alt="${article.title}">
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
    
    function truncateText(text, maxLength) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
});