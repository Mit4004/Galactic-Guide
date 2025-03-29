// Cosmic Scale functionality

document.addEventListener('DOMContentLoaded', function() {
    const cosmicScaleSlider = document.getElementById('cosmic-scale-slider');
    const scaleDescription = document.getElementById('scale-description');
    
    // Cosmic scale descriptions
    const scaleDescriptions = [
        "At the planetary scale, we observe worlds ranging from small rocky bodies like Mercury to gas giants like Jupiter. Earth, our home, is just one of billions of planets in our galaxy alone.",
        "Stars are massive balls of plasma held together by gravity. Our Sun is a medium-sized star that provides energy for life on Earth. The largest stars can be over 1,700 times the size of our Sun.",
        "Nebulae are vast clouds of gas and dust in space, often spanning hundreds of light-years. They are the birthplaces of stars and planetary systems.",
        "Galaxies are massive collections of stars, gas, dust, and dark matter. Our Milky Way contains hundreds of billions of stars and is just one of trillions of galaxies in the observable universe.",
        "The observable universe extends about 93 billion light-years in diameter and contains all matter and energy we can theoretically observe. Beyond this cosmic horizon lies the unknown."
    ];
    
    // Update description when slider changes
    if (cosmicScaleSlider && scaleDescription) {
        cosmicScaleSlider.addEventListener('input', function() {
            const value = parseInt(this.value);
            scaleDescription.textContent = scaleDescriptions[value - 1];
        });
        
        // Initialize with first description
        scaleDescription.textContent = scaleDescriptions[parseInt(cosmicScaleSlider.value) - 1];
    }
});