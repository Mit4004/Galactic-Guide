document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu elements
    const menuBtn = document.getElementById('menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Navigation elements
    const homeSection = document.getElementById('home');
    const solarSystemSection = document.getElementById('solar-system');
    const outerSpaceSection = document.getElementById('outer-space');
    const spaceExplorationSection = document.getElementById('space-exploration');
    
    const solarSystemOption = document.getElementById('solar-system-option');
    const outerSpaceOption = document.getElementById('outer-space-option');
    const spaceExplorationOption = document.getElementById('space-exploration-option');
    
    const backButtons = document.querySelectorAll('.back-button');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Modal elements
    const modal = document.getElementById('detail-modal');
    const closeButtons = document.querySelectorAll('.close-button');
    const detailContent = document.getElementById('detail-content');
    
    // Planet elements
    const planets = document.querySelectorAll('.planet');
    const spaceObjects = document.querySelectorAll('.space-object');
    
    // Category filter elements
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    // Random fact elements
    const randomFactElement = document.getElementById('random-fact');
    const newFactButton = document.getElementById('new-fact-btn');
    
    // Cosmic scale elements
    const cosmicScaleSlider = document.getElementById('cosmic-scale-slider');
    const scaleDescription = document.getElementById('scale-description');
    
    // Search elements
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    // Mobile menu functions
    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
    
    closeMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = 'auto';
    });
    
    // Navigation functions
    function showSection(section) {
        // Hide all sections
        homeSection.classList.remove('active');
        solarSystemSection.classList.remove('active');
        outerSpaceSection.classList.remove('active');
        spaceExplorationSection.classList.remove('active');
        
        // Update nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + section.id) {
                link.classList.add('active');
            }
        });
        
        // Show the selected section
        section.classList.add('active');
        
        // Close mobile menu if open
        mobileMenu.classList.remove('open');
        document.body.style.overflow = 'auto';
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    // Event listeners for navigation
    solarSystemOption.addEventListener('click', function() {
        showSection(solarSystemSection);
    });
    
    outerSpaceOption.addEventListener('click', function() {
        showSection(outerSpaceSection);
    });
    
    spaceExplorationOption.addEventListener('click', function() {
        showSection(spaceExplorationSection);
    });
    
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            showSection(homeSection);
        });
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                showSection(targetSection);
            }
        });
    });
    
    // Modal functions
    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    }
    
    // Close modal when clicking the close button
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
    
    // Planet data
    const planetData = {
        mercury: {
            name: 'Mercury',
            image: 'https://www.cronodon.com/images/mercury-5.jpg',
            description: 'Mercury is the smallest and innermost planet in the Solar System. It is named after the Roman deity Mercury, the messenger of the gods.',
            facts: [
                'Mercury has no atmosphere, which means it has no weather.',
                'A day on Mercury (sunrise to sunrise) lasts 176 Earth days.',
                'Mercury\'s surface resembles that of the Moon with many impact craters.',
                'Despite being the closest planet to the Sun, it is not the hottest planet (Venus is).',
                'Mercury has a large iron core that takes up about 60% of its mass.'
            ],
            diameter: '4,879 km',
            orbitalPeriod: '88 Earth days',
            gravity: '3.7 m/s² (38% of Earth\'s gravity)',
            temperature: '-173°C to 427°C',
            moons: '0',
            composition: 'Rocky planet with a large iron core',
            exploration: 'Mariner 10 (1974-1975), MESSENGER (2011-2015), BepiColombo (launched 2018)'
        },
        venus: {
            name: 'Venus',
            image: 'https://preview.redd.it/hpdqtm0d3kn31.jpg?auto=webp&s=3ca3932838f4f74f8359acf48052b67235b3ab12',
            description: 'Venus is the second planet from the Sun and is Earth\'s closest planetary neighbor. It\'s one of the four inner, terrestrial planets, and it\'s often called Earth\'s twin because it\'s similar in size and density.',
            facts: [
                'Venus rotates in the opposite direction to most planets.',
                'A day on Venus is longer than a year on Venus.',
                'Venus has a thick atmosphere that traps heat, making it the hottest planet in our solar system.',
                'The atmospheric pressure on Venus is 92 times greater than Earth\'s.',
                'Venus is covered in reflective clouds of sulfuric acid.'
            ],
            diameter: '12,104 km',
            orbitalPeriod: '225 Earth days',
            gravity: '8.87 m/s² (91% of Earth\'s gravity)',
            temperature: '462°C (average)',
            moons: '0',
            composition: 'Rocky planet with a thick atmosphere of carbon dioxide',
            exploration: 'Venera missions (1961-1984), Magellan (1989-1994), Venus Express (2006-2014)'
        },
        earth: {
            name: 'Earth',
            image: 'https://th.bing.com/th/id/OIP.Qe9PYMsh2gQWtgeEHY8-UQHaHa?rs=1&pid=ImgDetMain',
            description: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 71% of Earth\'s surface is covered with water, with the remaining 29% consisting of continents and islands.',
            facts: [
                'Earth is the only planet not named after a god.',
                'Earth has a powerful magnetic field created by its nickel-iron core.',
                'Earth\'s atmosphere is composed of 78% nitrogen, 21% oxygen, and 1% other gases.',
                'Earth has one natural satellite, the Moon.',
                'Earth is the densest planet in the Solar System.'
            ],
            diameter: '12,742 km',
            orbitalPeriod: '365.25 days',
            gravity: '9.8 m/s²',
            temperature: '-88°C to 58°C',
            moons: '1 (The Moon)',
            composition: 'Rocky planet with an iron-nickel core, silicate mantle, and water-rich surface',
            exploration: 'Continuously studied by humans throughout history'
        },
        mars: {
            name: 'Mars',
            image: 'https://th.bing.com/th/id/OIP.H-gWY6WmsEYUkDfr3QsnngHaE7?rs=1&pid=ImgDetMain',
            description: 'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. It is often referred to as the "Red Planet" because of its reddish appearance.',
            facts: [
                'Mars has the largest dust storms in the Solar System, which can last for months.',
                'Mars has two small moons, Phobos and Deimos.',
                'Mars has seasons like Earth, but they last twice as long.',
                'Mars has the tallest mountain in the Solar System, Olympus Mons.',
                'Evidence suggests that Mars once had liquid water on its surface.'
            ],
            diameter: '6,779 km',
            orbitalPeriod: '687 Earth days',
            gravity: '3.72 m/s² (38% of Earth\'s gravity)',
            temperature: '-153°C to 20°C',
            moons: '2 (Phobos and Deimos)',
            composition: 'Rocky planet with iron oxide (rust) on its surface',
            exploration: 'Viking 1 & 2 (1976), Pathfinder (1997), Spirit & Opportunity (2004), Curiosity (2012), Perseverance & Ingenuity (2021)'
        },
        jupiter: {
            name: 'Jupiter',
            image: 'https://cdn.sci.news/images/enlarge4/image_5608_2e-Jupiter.jpg',
            description: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined.',
            facts: [
                'Jupiter has the shortest day of all the planets, rotating once every 10 hours.',
                'Jupiter has at least 79 moons, with the four largest (Io, Europa, Ganymede, and Callisto) discovered by Galileo.',
                'Jupiter\'s Great Red Spot is a giant storm that has been raging for at least 400 years.',
                'Jupiter has a faint ring system, discovered in 1979 by Voyager 1.',
                'Jupiter\'s magnetic field is 14 times stronger than Earth\'s.'
            ],
            diameter: '139,820 km',
            orbitalPeriod: '11.86 Earth years',
            gravity: '24.79 m/s² (2.5 times Earth\'s gravity)',
            temperature: '-145°C (cloud tops)',
            moons: '79 confirmed moons',
            composition: 'Gas giant composed primarily of hydrogen and helium',
            exploration: 'Pioneer 10 & 11 (1973-1974), Voyager 1 & 2 (1979), Galileo (1995-2003), Juno (2016-present)'
        },
        saturn: {
            name: 'Saturn',
            image: 'https://nssdc.gsfc.nasa.gov/image/planetary/saturn/saturn_false.jpg',
            description: 'Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius about nine times that of Earth.',
            facts: [
                'Saturn has the most extensive ring system of any planet in the Solar System.',
                'Saturn has at least 82 moons, with Titan being the largest.',
                'Saturn is the least dense planet in the Solar System and would float in water if there were an ocean large enough.',
                'Saturn\'s rings are made mostly of ice particles, with a small amount of rocky debris and dust.',
                'A day on Saturn lasts only 10.7 hours.'
            ],
            diameter: '116,460 km',
            orbitalPeriod: '29.46 Earth years',
            gravity: '10.44 m/s² (1.07 times Earth\'s gravity)',
            temperature: '-178°C (cloud tops)',
            moons: '82 confirmed moons',
            composition: 'Gas giant composed primarily of hydrogen and helium',
            exploration: 'Pioneer 11 (1979), Voyager 1 & 2 (1980-1981), Cassini-Huygens (2004-2017)'
        },
        uranus: {
            name: 'Uranus',
            image: 'https://th.bing.com/th/id/R.4cdcbeb2b0c704536e411f3dc18eb6cd?rik=pK6ynZFigzMipA&riu=http%3a%2f%2fwww.darvill.clara.net%2fspace%2fimages%2furanus1.jpg&ehk=eaiKcKbfNY2Q0m4qHLl06RDeDIg4Je6UbxDc0RCNQzY%3d&risl=&pid=ImgRaw&r=0',
            description: 'Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System. It is an ice giant, similar in composition to Neptune.',
            facts: [
                'Uranus rotates on its side, with an axial tilt of 98 degrees.',
                'Uranus has 27 known moons, named after characters from the works of Shakespeare and Alexander Pope.',
                'Uranus is the coldest planet in the Solar System, with a minimum temperature of -224°C.',
                'Uranus has 13 known rings, which are dark and narrow compared to Saturn\'s.',
                'Uranus appears blue-green due to methane in its atmosphere.'
            ],
            diameter: '50,724 km',
            orbitalPeriod: '84 Earth years',
            gravity: '8.69 m/s² (89% of Earth\'s gravity)',
            temperature: '-224°C (minimum)',
            moons: '27 known moons',
            composition: 'Ice giant composed of water, methane, and ammonia ices',
            exploration: 'Voyager 2 (1986) is the only spacecraft to visit Uranus'
        },
        neptune: {
            name: 'Neptune',
            image: 'https://www.worldatlas.com/r/w1200-h630-c1200x630/upload/75/ac/2c/shutterstock-521649988.jpg',
            description: 'Neptune is the eighth and farthest known planet from the Sun in the Solar System. It is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet.',
            facts: [
                'Neptune was the first planet located through mathematical predictions rather than through regular observations.',
                'Neptune has the strongest winds in the Solar System, reaching speeds of 2,100 km/h.',
                'Neptune has 14 known moons, with Triton being the largest.',
                'Neptune has six known rings, which are dark and difficult to see.',
                'Neptune completes one rotation in about 16 hours.'
            ],
            diameter: '49,244 km',
            orbitalPeriod: '165 Earth years',
            gravity: '11.15 m/s² (1.14 times Earth\'s gravity)',
            temperature: '-218°C (average)',
            moons: '14 known moons',
            composition: 'Ice giant composed of water, methane, and ammonia ices',
            exploration: 'Voyager 2 (1989) is the only spacecraft to visit Neptune'
        }
    };
    
    // Space object data
    const spaceObjectData = {
        'black-hole': {
            name: 'Black Holes',
            image: 'https://solarsystem.nasa.gov/internal_resources/3622',
            description: 'A black hole is a region of spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—can escape from it.',
            facts: [
                'Black holes form when massive stars die and collapse under their own gravity.',
                'The boundary of a black hole is called the event horizon, beyond which nothing can escape.',
                'Time slows down near a black hole due to gravitational time dilation.',
                'Supermassive black holes exist at the center of most galaxies, including our Milky Way.',
                'Black holes can grow by absorbing mass or merging with other black holes.'
            ],
            types: 'Stellar, Intermediate, Supermassive, Primordial (theoretical)',
            discovery: 'First predicted by Einstein\'s theory of general relativity in 1916',
            size: 'From a few kilometers (stellar) to billions of kilometers (supermassive)',
            detection: 'Detected indirectly through their effects on surrounding matter and space',
            famous: 'Sagittarius A* (center of Milky Way), M87* (first photographed black hole)'
        },
        'nebula': {
            name: 'Nebulae',
            image: 'https://th.bing.com/th/id/OIP.jGWkE0FfUzPt1GAkuONeMQHaFM?rs=1&pid=ImgDetMain',
            description: 'A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases. Originally, the term was used to describe any diffuse astronomical object, including galaxies beyond the Milky Way.',
            facts: [
                'Nebulae are often star-forming regions, such as in the "Pillars of Creation" in the Eagle Nebula.',
                'Planetary nebulae form when a dying star expels its outer layers of gas.',
                'Supernova remnants are nebulae created by the explosion of a star.',
                'The Orion Nebula is one of the brightest nebulae and can be seen with the naked eye.',
                'Some nebulae are illuminated by stars, while others block light and appear as dark patches.'
            ],
            types: 'Emission, Reflection, Dark, Planetary, Supernova Remnants',
            size: 'Can span hundreds of light-years across',
            composition: 'Interstellar dust, hydrogen, helium, and other ionized gases',
            famous: 'Orion Nebula, Eagle Nebula, Crab Nebula, Helix Nebula, Cat\'s Eye Nebula'
        },
        // Additional space objects data would continue here...
    };

    // Random space facts
    const spaceFacts = [
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
    
    // Cosmic scale descriptions
    const scaleDescriptions = [
        "At the planetary scale, we observe worlds ranging from small rocky bodies like Mercury to gas giants like Jupiter. Earth, our home, is just one of billions of planets in our galaxy alone.",
        "Stars are massive balls of plasma held together by gravity. Our Sun is a medium-sized star that provides energy for life on Earth. The largest stars can be over 1,700 times the size of our Sun.",
        "Nebulae are vast clouds of gas and dust in space, often spanning hundreds of light-years. They are the birthplaces of stars and planetary systems.",
        "Galaxies are massive collections of stars, gas, dust, and dark matter. Our Milky Way contains hundreds of billions of stars and is just one of trillions of galaxies in the observable universe.",
        "The observable universe extends about 93 billion light-years in diameter and contains all matter and energy we can theoretically observe. Beyond this cosmic horizon lies the unknown."
    ];
    
    // Function to display planet details
    function showPlanetDetails(planetName) {
        const planet = planetData[planetName];
        
        if (!planet) return;
        
        let factsHTML = '';
        planet.facts.forEach(fact => {
            factsHTML += `<li>${fact}</li>`;
        });
        
        detailContent.innerHTML = `
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
        
        openModal();
    }
    
    // Function to display space object details
    function showSpaceObjectDetails(objectName) {
        const spaceObject = spaceObjectData[objectName];
        
        if (!spaceObject) return;
        
        let factsHTML = '';
        spaceObject.facts.forEach(fact => {
            factsHTML += `<li>${fact}</li>`;
        });
        
        let infoHTML = '';
        for (const [key, value] of Object.entries(spaceObject)) {
            if (key !== 'name' && key !== 'image' && key !== 'description' && key !== 'facts') {
                infoHTML += `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</p>`;
            }
        }
        
        detailContent.innerHTML = `
            <h3>${spaceObject.name}</h3>
            <div class="detail-image">
                <img src="${spaceObject.image}" alt="${spaceObject.name}">
            </div>
            <p>${spaceObject.description}</p>
            <h4>Key Facts:</h4>
            <ul class="fact-list">
                ${factsHTML}
            </ul>
            <div class="detail-info">
                ${infoHTML}
            </div>
        `;
        
        openModal();
    }
    
    // Add event listeners to planets
    planets.forEach(planet => {
        planet.addEventListener('click', function() {
            const planetName = this.getAttribute('data-planet');
            showPlanetDetails(planetName);
        });
    });
    
    // Add event listeners to space objects
    spaceObjects.forEach(object => {
        object.addEventListener('click', function() {
            const objectName = this.getAttribute('data-object');
            showSpaceObjectDetails(objectName);
        });
    });
    
    // Category filter functionality
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter space objects
            spaceObjects.forEach(object => {
                if (category === 'all' || object.getAttribute('data-category') === category) {
                    object.style.display = 'block';
                } else {
                    object.style.display = 'none';
                }
            });
        });
    });
    
    // Random fact functionality
    function showRandomFact() {
        const randomIndex = Math.floor(Math.random() * spaceFacts.length);
        randomFactElement.textContent = spaceFacts[randomIndex];
    }
    
    // Show initial random fact
    showRandomFact();
    
    // New fact button
    newFactButton.addEventListener('click', showRandomFact);
    
    // Cosmic scale slider
    cosmicScaleSlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        scaleDescription.textContent = scaleDescriptions[value - 1];
    });
    
    // Initialize with first description
    scaleDescription.textContent = scaleDescriptions[4];
    
    // Search functionality
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') return;
        
        // Search in planets
        for (const planetKey in planetData) {
            if (planetData[planetKey].name.toLowerCase().includes(searchTerm)) {
                showSection(solarSystemSection);
                showPlanetDetails(planetKey);
                return;
            }
        }
        
        // Search in space objects
        for (const objectKey in spaceObjectData) {
            if (spaceObjectData[objectKey].name.toLowerCase().includes(searchTerm)) {
                showSection(outerSpaceSection);
                showSpaceObjectDetails(objectKey);
                return;
            }
        }
        
        // If no match found
        alert(`No results found for "${searchInput.value}"`);
    }
});