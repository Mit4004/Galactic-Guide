// API Handlers for NASA, SpaceX, and News APIs

document.addEventListener('DOMContentLoaded', function() {
    // NASA API Key - Replace with your own API key from https://api.nasa.gov/
    const NASA_API_KEY = 'DEMO_KEY';
    
    // Helper function to format dates
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    // Helper function to truncate text
    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    }

    
    // Fetch NASA Astronomy Picture of the Day
    const apodContainer = document.getElementById('apod-container');
    if (apodContainer) {
        fetchNASAAPOD();
    }
    
    // Fetch upcoming astronomical events
    const eventsContainer = document.getElementById('events-container');
    if (eventsContainer) {
        fetchAstronomicalEvents();
    }
    
    // Fetch SpaceX launches
    const launchesContainer = document.getElementById('launches-container');
    if (launchesContainer) {
        fetchSpaceXLaunches();
    }
    
    // Fetch space news preview
    const newsPreviewContainer = document.getElementById('news-preview-container');
    if (newsPreviewContainer) {
        fetchSpaceNewsPreview();
    }
    
    // NASA APOD API
    async function fetchNASAAPOD() {
        try {
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
            const data = await response.json();
            
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
    
    // NASA Neo - Near Earth Object API for upcoming events
    async function fetchAstronomicalEvents() {
        try {
            // Get today's date and 7 days from now
            const today = new Date();
            const nextWeek = new Date(today);
            nextWeek.setDate(nextWeek.getDate() + 7);
            
            const startDate = today.toISOString().split('T')[0];
            const endDate = nextWeek.toISOString().split('T')[0];
            
            const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`);
            const data = await response.json();
            
            if (data && data.near_earth_objects && eventsContainer) {
                let eventsHTML = '';
                let eventCount = 0;
                
                // Process each day's NEOs
                for (const [date, neos] of Object.entries(data.near_earth_objects)) {
                    // Sort by closest approach
                    neos.sort((a, b) => {
                        return a.close_approach_data[0].miss_distance.kilometers - b.close_approach_data[0].miss_distance.kilometers;
                    });
                    
                    // Take only the closest NEO for each day
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
    
    // SpaceX API for upcoming launches
    async function fetchSpaceXLaunches() {
        try {
            const response = await fetch('https://api.spacexdata.com/v4/launches/upcoming');
            const launches = await response.json();
            
            if (launches && launchesContainer) {
                let launchesHTML = '';
                
                // Display up to 3 upcoming launches
                const upcomingLaunches = launches.slice(0, 3);
                
                upcomingLaunches.forEach(launch => {
                    const launchDate = new Date(launch.date_utc);
                    const formattedDate = launchDate.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    });
                    
                    launchesHTML += `
                        <div class="launch">
                            <div class="launch-date">${formattedDate}</div>
                            <h4>${launch.name}</h4>
                            <p class="launch-mission">${launch.details || 'Mission details not available'}</p>
                            <p>Rocket: ${launch.rocket?.name || 'Unknown'}</p>
                            <p>Launch Site: ${launch.launchpad?.name || 'Unknown'}</p>
                        </div>
                    `;
                });
                
                if (launchesHTML === '') {
                    launchesContainer.innerHTML = '<p>No upcoming SpaceX launches found.</p>';
                } else {
                    launchesContainer.innerHTML = launchesHTML;
                }
            }
        } catch (error) {
            console.error('Error fetching SpaceX launches:', error);
            launchesContainer.innerHTML = '<p>Failed to load upcoming SpaceX launches. Please try again later.</p>';
        }
    }
    
    // Space News API for latest news
    async function fetchSpaceNewsPreview() {
        try {
            const response = await fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=3');
            const articles = await response.json();
            
            if (articles && newsPreviewContainer) {
                let newsHTML = '';
                
                articles.forEach(article => {
                    const publishDate = new Date(article.publishedAt);
                    const formattedDate = publishDate.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    });
                    
                    newsHTML += `
                        <div class="news-item">
                            <div class="news-image">
                                <img src="${article.imageUrl}" alt="${article.title}">
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