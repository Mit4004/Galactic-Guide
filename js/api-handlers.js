
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
        if (!eventsContainer) return;

        const allEvents = [
            { date: '2025-04-13', name: 'Meteor Shower: Virginids Peak', icon: '☄️', description: 'The Virginids meteor shower reaches its peak activity, visible after midnight in dark skies.' },
            { date: '2025-04-16', name: 'Full Moon — Pink Moon', icon: '🌕', description: "April's full moon, traditionally called the Pink Moon. Best viewed at moonrise on the horizon." },
            { date: '2025-05-06', name: 'Meteor Shower: Eta Aquariids Peak', icon: '☄️', description: "Debris from Halley's Comet lights up the sky. Up to 50 meteors per hour visible before dawn." },
            { date: '2025-05-13', name: 'Full Moon — Flower Moon', icon: '🌕', description: "May's full moon rises large and bright. A great time for moonlit stargazing." },
            { date: '2025-06-11', name: 'Full Moon — Strawberry Moon', icon: '🌕', description: "June's full moon, also the closest full moon to the summer solstice this year." },
            { date: '2025-06-21', name: 'Summer Solstice', icon: '☀️', description: "The longest day of the year in the Northern Hemisphere — Earth's north pole is tilted closest to the Sun." },
            { date: '2025-07-10', name: 'Full Moon — Buck Moon', icon: '🌕', description: "July's full moon coincides with peak meteor shower season. Named for new antler growth on deer." },
            { date: '2025-07-28', name: 'Meteor Shower: Delta Aquariids Peak', icon: '☄️', description: 'Up to 20 meteors per hour streak across the sky from the direction of Aquarius.' },
            { date: '2025-08-09', name: 'Full Moon — Sturgeon Moon', icon: '🌕', description: "August's full moon. Watch for a super moon effect if it falls near lunar perigee." },
            { date: '2025-08-12', name: 'Meteor Shower: Perseids Peak', icon: '☄️', description: 'One of the best meteor showers of the year — up to 100 meteors per hour under dark skies!' },
            { date: '2025-09-07', name: 'Total Lunar Eclipse', icon: '🌑', description: 'The Moon passes fully into Earth\'s shadow, turning deep red. Visible from Europe, Africa, and Asia.' },
            { date: '2025-09-21', name: 'Autumnal Equinox', icon: '🌍', description: 'Day and night are nearly equal in length worldwide. Marks the start of astronomical autumn.' },
            { date: '2025-10-08', name: 'Meteor Shower: Draconids Peak', icon: '☄️', description: 'A brief but intense flurry of meteors from Comet 21P. Best viewed at dusk.' },
            { date: '2025-10-21', name: 'Meteor Shower: Orionids Peak', icon: '☄️', description: "Another gift from Halley's Comet — up to 25 meteors per hour radiate from Orion." },
            { date: '2025-11-17', name: 'Meteor Shower: Leonids Peak', icon: '☄️', description: 'The Leonids can occasionally produce meteor storms. Even in quiet years expect 15 or more per hour.' },
            { date: '2025-12-13', name: 'Meteor Shower: Geminids Peak', icon: '☄️', description: 'The king of meteor showers — up to 120 colorful meteors per hour from asteroid 3200 Phaethon.' },
            { date: '2025-12-21', name: 'Winter Solstice', icon: '❄️', description: 'The shortest day of the year in the Northern Hemisphere. Marks the start of astronomical winter.' },
            { date: '2026-02-17', name: 'Annular Solar Eclipse', icon: '🌑', description: 'The Moon covers the center of the Sun, leaving a brilliant ring of fire visible along its path.' },
            { date: '2026-08-12', name: 'Total Solar Eclipse', icon: '🌑', description: 'A total solar eclipse crosses parts of Europe and North Africa — a rare and breathtaking event.' },
        ];

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming = allEvents.filter(e => new Date(e.date) >= today).slice(0, 3);

        if (upcoming.length === 0) {
            eventsContainer.innerHTML = '<p>No upcoming events found.</p>';
            return;
        }

        eventsContainer.innerHTML = upcoming.map(event => {
            const d = new Date(event.date);
            const formattedDate = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            return `
                <div class="event">
                    <div class="event-date">${formattedDate}</div>
                    <h4>${event.icon} ${event.name}</h4>
                    <p>${event.description}</p>
                </div>
            `;
        }).join('');
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