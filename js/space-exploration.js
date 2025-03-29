// Space Exploration Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Tab functionality
    if (tabButtons && tabContents) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Update active button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Show selected tab content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tabId) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }
    
    // Fetch upcoming missions if on the future tab
    const futureTab = document.getElementById('future');
    if (futureTab) {
        // You could add API calls here to fetch upcoming missions
        // For example, NASA's API for upcoming launches or missions
        
        // Example:
        // fetchUpcomingMissions();
    }
    
    // Function to fetch upcoming missions (placeholder)
    function fetchUpcomingMissions() {
        // This would be implemented with actual API calls
        console.log('Fetching upcoming missions...');
    }
});