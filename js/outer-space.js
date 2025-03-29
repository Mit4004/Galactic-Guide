// Outer Space Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    const spaceObjectsContainer = document.getElementById('space-objects-container');
    const spaceObjectModal = document.getElementById('space-object-modal');
    const spaceObjectDetailContent = document.getElementById('space-object-detail-content');
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    // Load space objects data from JSON file
    fetch('/data/space-objects.json')
        .then(response => response.json())
        .then(data => {
            if (data && data.spaceObjects && spaceObjectsContainer) {
                let objectsHTML = '';
                
                data.spaceObjects.forEach(object => {
                    objectsHTML += `
                        <div class="space-object" data-object="${object.id}" data-category="${object.category}">
                            <div class="object-image">
                                <img src="${object.image}" alt="${object.name}">
                            </div>
                            <h3>${object.name}</h3>
                            <p>${truncateText(object.description, 100)}</p>
                        </div>
                    `;
                });
                
                spaceObjectsContainer.innerHTML = objectsHTML;
                
                // Add event listeners to space objects
                const spaceObjectElements = document.querySelectorAll('.space-object');
                spaceObjectElements.forEach(object => {
                    object.addEventListener('click', function() {
                        const objectId = this.getAttribute('data-object');
                        const objectData = data.spaceObjects.find(o => o.id === objectId);
                        
                        if (objectData) {
                            showSpaceObjectDetails(objectData);
                        }
                    });
                });
            }
        })
        .catch(error => {
            console.error('Error loading space objects data:', error);
            if (spaceObjectsContainer) {
                spaceObjectsContainer.innerHTML = '<p>Failed to load space objects data. Please try again later.</p>';
            }
        });
    
    // Function to open modal
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
        }
    }

    // Function to display space object details
    function showSpaceObjectDetails(object) {
        if (!spaceObjectDetailContent || !spaceObjectModal) return;
        
        let factsHTML = '';
        object.facts.forEach(fact => {
            factsHTML += `<li>${fact}</li>`;
        });
        
        let infoHTML = '';
        for (const [key, value] of Object.entries(object)) {
            if (key !== 'id' && key !== 'name' && key !== 'category' && key !== 'image' && key !== 'description' && key !== 'facts') {
                infoHTML += `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</p>`;
            }
        }
        
        spaceObjectDetailContent.innerHTML = `
            <h3>${object.name}</h3>
            <div class="detail-image">
                <img src="${object.image}" alt="${object.name}">
            </div>
            <p>${object.description}</p>
            <h4>Key Facts:</h4>
            <ul class="fact-list">
                ${factsHTML}
            </ul>
            <div class="detail-info">
                ${infoHTML}
            </div>
        `;
        
        openModal('space-object-modal');
    }
    
    // Category filter functionality
    if (categoryButtons) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active button
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter space objects
                const spaceObjects = document.querySelectorAll('.space-object');
                spaceObjects.forEach(object => {
                    if (category === 'all' || object.getAttribute('data-category') === category) {
                        object.style.display = 'block';
                    } else {
                        object.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Helper function to truncate text
    function truncateText(text, maxLength) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
});