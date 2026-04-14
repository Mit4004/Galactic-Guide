
document.addEventListener('DOMContentLoaded', function() {
    const NASA_API_KEY = (typeof config !== 'undefined' && config.NASA_API_KEY) ? config.NASA_API_KEY : 'DEMO_KEY';
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    }

    
    const apodContainer = document.getElementById('apod-container');
    if (apodContainer) {
        fetchNASAAPOD();
    }
    
    const eventsContainer = document.getElementById('events-container');
    if (eventsContainer) {
        fetchAstronomicalEvents();
    }
    
    const launchesContainer = document.getElementById('launches-container');
    if (launchesContainer) {
        fetchISROLaunches();
    }
    
    const newsPreviewContainer = document.getElementById('news-preview-container');
    if (newsPreviewContainer) {
        fetchSpaceNewsPreview();
    }
    
    async function fetchNASAAPOD() {
        try {
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
            const data = await response.json();
            
            if (data.error) {
                apodContainer.innerHTML = `
                    <div style="text-align: center; padding: 20px; background: rgba(255, 50, 50, 0.1); border-radius: 10px; border: 1px solid rgba(255, 50, 50, 0.3);">
                        <h4 style="color: #ffaaaa;">API Rate Limit Reached</h4>
                        <p style="font-size: 0.9rem;">The current API key has hit its hourly rate limit. Make sure your valid key is placed inside <code>js/config.js</code>.</p>
                    </div>
                `;
                return;
            }
            
            if (data && apodContainer) {
                let mediaContent = '';
                
                if (data.media_type === 'image') {
                    mediaContent = `<img src="${data.url}" alt="${data.title}" class="apod-image">`;
                } else if (data.media_type === 'video') {
                    mediaContent = `<iframe src="${data.url}" frameborder="0" allowfullscreen class="apod-video"></iframe>`;
                }
                
                apodContainer.innerHTML = `
                    ${mediaContent}
                    <h4 class="apod-title">${data.title}</h4>
                    <div class="apod-date">${formatDate(data.date)}</div>
                    <p class="apod-explanation">${data.explanation}</p>
                    <p class="apod-copyright">${data.copyright ? `© ${data.copyright}` : ''}</p>
                `;
            }
        } catch (error) {
            console.error('Error fetching NASA APOD:', error);
            apodContainer.innerHTML = '<p>Failed to load Astronomy Picture of the Day. Please try again later.</p>';
        }
    }
    
    async function fetchAstronomicalEvents() {
        try {
            const today = new Date();
            const nextWeek = new Date(today);
            nextWeek.setDate(nextWeek.getDate() + 7);
            
            const startDate = today.toISOString().split('T')[0];
            const endDate = nextWeek.toISOString().split('T')[0];
            
            const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`);
            const data = await response.json();
            
            if (data.error) {
                if (eventsContainer) eventsContainer.innerHTML = '<p style="color:#ffaaaa">NASA API rate limit exceeded. Get a free key at api.nasa.gov.</p>';
                return;
            }
            
            if (data && data.near_earth_objects && eventsContainer) {
                let eventsHTML = '';
                let eventCount = 0;
                
                for (const [date, neos] of Object.entries(data.near_earth_objects)) {
                    neos.sort((a, b) => {
                        return a.close_approach_data[0].miss_distance.kilometers - b.close_approach_data[0].miss_distance.kilometers;
                    });
                    
                    if (neos.length > 0 && eventCount < 3) {
                        const neo = neos[0];
                        const approachDate = new Date(neo.close_approach_data[0].close_approach_date);
                        const formattedDate = approachDate.toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        });
                        
                        const distance = parseFloat(neo.close_approach_data[0].miss_distance.kilometers).toLocaleString();
                        const diameter = parseFloat(neo.estimated_diameter.kilometers.estimated_diameter_max).toFixed(2);
                        const hazardous = neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No';
                        
                        eventsHTML += `
                            <div class="event">
                                <div class="event-date">${formattedDate}</div>
                                <h4>${neo.name}</h4>
                                <p>Distance from Earth: ${distance} km</p>
                                <p>Estimated Diameter: ${diameter} km</p>
                                <p>Potentially Hazardous: ${hazardous}</p>
                            </div>
                        `;
                        
                        eventCount++;
                    }
                }
                
                if (eventsHTML === '') {
                    eventsContainer.innerHTML = '<p>No upcoming astronomical events found.</p>';
                } else {
                    eventsContainer.innerHTML = eventsHTML;
                }
            }
        } catch (error) {
            console.error('Error fetching astronomical events:', error);
            eventsContainer.innerHTML = '<p>Failed to load upcoming astronomical events. Please try again later.</p>';
        }
    }
    
    async function fetchISROLaunches() {
        try {
            const response = await fetch('https://services.isrostats.in/api/launches');
            const launches = await response.json();
            
            if (launches && launchesContainer) {
                let launchesHTML = '';
                
                const recentLaunches = launches.slice(0, 3);
                
                recentLaunches.forEach(launch => {
                    const launchDate = new Date(launch.LaunchDate);
                    const formattedDate = launchDate.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    });
                    
                    launchesHTML += `
                        <div class="launch">
                            <div class="launch-date">${formattedDate}</div>
                            <h4>${launch.Name}</h4>
                            <p class="launch-mission">Payload: ${launch.Payload || 'Unknown'}</p>
                            <p>Rocket: ${launch.LaunchType}</p>
                            <p>Status: ${launch.MissionStatus}</p>
                        </div>
                    `;
                });
                
                if (launchesHTML === '') {
                    launchesContainer.innerHTML = '<p>No recent ISRO missions found.</p>';
                } else {
                    launchesContainer.innerHTML = launchesHTML;
                }
            }
        } catch (error) {
            console.error('Error fetching ISRO missions:', error);
            launchesContainer.innerHTML = '<p>Failed to load recent ISRO missions. Please try again later.</p>';
        }
    }
    
    async function fetchSpaceNewsPreview() {
        try {
            const response = await fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=3');
            const data = await response.json();
            const articles = data.results;
            
            if (articles && newsPreviewContainer) {
                let newsHTML = '';
                
                articles.forEach(article => {
                    const publishDate = new Date(article.published_at);
                    const formattedDate = publishDate.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    });
                    
                    newsHTML += `
                        <div class="news-item">
                            <div class="news-image">
                                <img src="${article.image_url}" alt="${article.title}">
                            </div>
                            <div class="news-date">${formattedDate}</div>
                            <h4 class="news-title">${article.title}</h4>
                            <p class="news-summary">${truncateText(article.summary, 150)}</p>
                            <a href="${article.url}" target="_blank" class="news-link">Read More</a>
                        </div>
                    `;
                });
                
                if (newsHTML === '') {
                    newsPreviewContainer.innerHTML = '<p>No space news available.</p>';
                } else {
                    newsPreviewContainer.innerHTML = newsHTML;
                }
            }
        } catch (error) {
            console.error('Error fetching space news:', error);
            newsPreviewContainer.innerHTML = '<p>Failed to load space news. Please try again later.</p>';
        }
    }
});