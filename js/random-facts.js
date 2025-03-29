// Random Space Facts

document.addEventListener('DOMContentLoaded', function() {
    const randomFactElement = document.getElementById('random-fact');
    const newFactButton = document.getElementById('new-fact-btn');
    
    if (randomFactElement) {
        // Fetch facts from JSON file
        fetch('/data/facts.json')
            .then(response => response.json())
            .then(data => {
                if (data && data.facts && data.facts.length > 0) {
                    // Show initial random fact
                    showRandomFact(data.facts);
                    
                    // New fact button
                    if (newFactButton) {
                        newFactButton.addEventListener('click', function() {
                            showRandomFact(data.facts);
                        });
                    }
                } else {
                    randomFactElement.textContent = 'No space facts available.';
                }
            })
            .catch(error => {
                console.error('Error loading space facts:', error);
                
                // Fallback to hardcoded facts if JSON file fails to load
                const fallbackFacts = [
                    "There are more stars in the universe than grains of sand on all the beaches on Earth.",
                    "The footprints left by the Apollo astronauts on the Moon will probably stay there for at least 100 million years.",
                    "A day on Venus is longer than a year on Venus.",
                    "If you could put Saturn in a giant bathtub, it would float.",
                    "The largest known star, UY Scuti, is more than 1,700 times the size of our Sun.",
                    "There is a planet made of diamonds, called 55 Cancri e.",
                    "The Great Red Spot on Jupiter has been swirling for at least 400 years.",
                    "The Sun makes up 99.86% of the mass in our solar system.",
                    "One million Earths could fit inside the Sun.",
                    "Light from the Sun takes about 8 minutes to reach Earth."
                ];
                
                showRandomFact(fallbackFacts);
                
                // New fact button with fallback facts
                if (newFactButton) {
                    newFactButton.addEventListener('click', function() {
                        showRandomFact(fallbackFacts);
                    });
                }
            });
    }
    
    // Function to display a random fact
    function showRandomFact(facts) {
        const randomIndex = Math.floor(Math.random() * facts.length);
        randomFactElement.textContent = facts[randomIndex];
    }
});