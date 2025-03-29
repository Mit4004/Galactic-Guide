// Solar System Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    const planetsContainer = document.getElementById('planets-container');
    const planetModal = document.getElementById('planet-modal');
    const planetDetailContent = document.getElementById('planet-detail-content');
    const closeButtons = document.querySelectorAll('.close-button');
    
    // Load planet data from JSON file
    fetch('/data/planets.json')
        .then(response => response.json())
        .then(data => {
            if (data && data.planets && planetsContainer) {
                let planetsHTML = '';
                
                data.planets.forEach(planet => {
                    planetsHTML += `
                        <div class="planet" data-planet="${planet.id}">
                            <div class="planet-image">
                                <img src="${planet.image}" alt="${planet.name}">
                            </div>
                            <h3>${planet.name}</h3>
                            <p>${planet.shortDescription}</p>
                        </div>
                    `;
                });
                
                planetsContainer.innerHTML = planetsHTML;
                
                // Add event listeners to planets
                const planetElements = document.querySelectorAll('.planet');
                planetElements.forEach(planet => {
                    planet.addEventListener('click', function() {
                        const planetId = this.getAttribute('data-planet');
                        const planetData = data.planets.find(p => p.id === planetId);
                        
                        if (planetData) {
                            showPlanetDetails(planetData);
                        }
                    });
                });
            }
        })
        .catch(error => {
            console.error('Error loading planet data:', error);
            if (planetsContainer) {
                planetsContainer.innerHTML = '<p>Failed to load planet data. Please try again later.</p>';
            }
        });
    
    // Function to display planet details
    function showPlanetDetails(planet) {
        if (!planetDetailContent || !planetModal) return;
        
        let factsHTML = '';
        planet.facts.forEach(fact => {
            factsHTML += `<li>${fact}</li>`;
        });
        
        planetDetailContent.innerHTML = `
            <h3>${planet.name}</h3>
            <div class="detail-image">
                <img src="${planet.image}" alt="${planet.name}">
            </div>
            <p>${planet.description}</p>
            <h4>Key Facts:</h4>
            <ul class="fact-list">
                ${factsHTML}
            </ul>
            <div class="detail-info">
                <p><strong>Diameter:</strong> ${planet.diameter}</p>
                <p><strong>Orbital Period:</strong> ${planet.orbitalPeriod}</p>
                <p><strong>Gravity:</strong> ${planet.gravity}</p>
                <p><strong>Temperature:</strong> ${planet.temperature}</p>
                <p><strong>Moons:</strong> ${planet.moons}</p>
                <p><strong>Composition:</strong> ${planet.composition}</p>
                <p><strong>Exploration:</strong> ${planet.exploration}</p>
            </div>
        `;
        
        planetModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Close modal when clicking the close button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (planetModal) {
                planetModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Enable scrolling
            }
        });
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === planetModal) {
            planetModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        }
    });
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && planetModal && planetModal.style.display === 'block') {
            planetModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        }
    });
});