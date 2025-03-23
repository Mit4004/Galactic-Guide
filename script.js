document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: false
            },
            move: {
                enable: true,
                speed: 0.5,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "bubble"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                bubble: {
                    distance: 100,
                    size: 4,
                    duration: 2,
                    opacity: 0.8,
                    speed: 3
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
    
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
    const glossaryModal = document.getElementById('glossary-modal');
    const closeButtons = document.querySelectorAll('.close-button');
    const detailContent = document.getElementById('detail-content');
    const glossaryLink = document.getElementById('glossary-link');
    
    // Planet elements
    const planets = document.querySelectorAll('.planet');
    const spaceObjects = document.querySelectorAll('.space-object');
    
    // View toggle elements
    const viewButtons = document.querySelectorAll('.view-btn');
    const solarSystem3D = document.getElementById('solar-system-3d');
    const planetsList = document.getElementById('planets-list');
    
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
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Initialize 3D view if solar system section is shown
        if (section === solarSystemSection && solarSystem3D.innerHTML === '') {
            initThreeJS();
        }
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
        glossaryModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    }
    
    // Close modal when clicking the close button
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal || event.target === glossaryModal) {
            closeModal();
        }
    });
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
    
    document.addEventListener("DOMContentLoaded", function () {
        const viewButtons = document.querySelectorAll(".view-btn");
        const solarSystem3D = document.getElementById("solar-system-3d");
        const planetsList = document.getElementById("planets-list");
        
        // Ensure the video element exists before using it
        const solarVideo = document.getElementById("solar-video");
    
        viewButtons.forEach((button) => {
            button.addEventListener("click", function () {
                viewButtons.forEach((btn) => btn.classList.remove("active"));
                this.classList.add("active");
    
                const view = this.getAttribute("data-view");
    
                if (view === "3d") {
                    solarSystem3D.classList.add("active-view");
                    planetsList.classList.remove("active-view");
    
                    // Play the video when switching to 3D view
                    if (solarVideo) {
                        solarVideo.play();
                    }
                } else {
                    solarSystem3D.classList.remove("active-view");
                    planetsList.classList.add("active-view");
    
                    // Pause the video when switching views
                    if (solarVideo) {
                        solarVideo.pause();
                    }
                }
            });
        });
    });    

    // Open glossary modal
    glossaryLink.addEventListener('click', function(e) {
        e.preventDefault();
        glossaryModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Generate glossary content if it's empty
        const glossaryItems = document.getElementById('glossary-items');
        if (glossaryItems.innerHTML === '') {
            generateGlossary();
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
        'galaxy': {
            name: 'Galaxies',
            image: 'https://th.bing.com/th/id/OIP.MHaR4548lqlsuuFAsiCt3QHaEh?rs=1&pid=ImgDetMain',
            description: 'A galaxy is a gravitationally bound system of stars, stellar remnants, interstellar gas, dust, and dark matter. The word galaxy is derived from the Greek galaxias, literally "milky", a reference to the Milky Way.',
            facts: [
                'There are estimated to be more than 100 billion galaxies in the observable universe.',
                'The Milky Way is a barred spiral galaxy containing an estimated 100-400 billion stars.',
                'Galaxies are categorized by their shape: spiral, elliptical, and irregular.',
                'Galaxies are mostly empty space, with stars separated by vast distances.',
                'Galaxies often collide and merge, a process that takes billions of years.'
            ],
            types: 'Spiral, Elliptical, Irregular, Lenticular',
            size: 'From a few thousand to hundreds of thousands of light-years across',
            composition: 'Stars, gas, dust, dark matter, and usually a supermassive black hole at the center',
            famous: 'Milky Way, Andromeda Galaxy, Whirlpool Galaxy, Sombrero Galaxy'
        },
        'star': {
            name: 'Stars',
            image: 'https://cdn.britannica.com/38/111338-050-D23BE7C8/Stars-NGC-290-Hubble-Space-Telescope.jpg',
            description: 'A star is an astronomical object consisting of a luminous spheroid of plasma held together by its own gravity. The nearest star to Earth is the Sun, which is the source of most of the energy on Earth.',
            facts: [
                'Stars form from clouds of gas and dust in space called nebulae.',
                'Stars produce energy through nuclear fusion, combining hydrogen atoms to form helium.',
                'Stars have different colors depending on their temperature, from red (coolest) to blue (hottest).',
                'The life cycle of a star depends on its mass, with more massive stars having shorter lives.',
                'When stars die, they can become white dwarfs, neutron stars, or black holes.'
            ],
            types: 'Main Sequence, Red Giants, White Dwarfs, Neutron Stars, Supergiants',
            lifespan: 'From a few million years (massive stars) to trillions of years (red dwarfs)',
            composition: 'Primarily hydrogen and helium, with trace amounts of heavier elements',
            famous: 'Sun, Sirius, Betelgeuse, Proxima Centauri, Polaris (North Star)'
        },
        'supernova': {
            name: 'Supernovae',
            image: 'https://www.worldatlas.com/r/w1200-q80/upload/67/30/3d/shutterstock-1020241981.jpg',
            description: 'A supernova is the explosion of a star that has reached the end of its life. It is the largest explosion that takes place in space and can be seen from Earth with the naked eye if it occurs within our galaxy.',
            facts: [
                'A supernova can briefly outshine an entire galaxy.',
                'Supernovae are responsible for creating and dispersing many of the heavy elements in the universe.',
                'There are two main types of supernovae: core-collapse (massive stars) and Type Ia (white dwarf stars).',
                'The last supernova observed in our galaxy was in 1604, known as Kepler\'s Supernova.',
                'Supernovae remnants can persist for thousands of years.'
            ],
            types: 'Type Ia, Type Ib/c, Type II',
            energy: 'Releases as much energy in a few seconds as our Sun will in its entire lifetime',
            frequency: 'About one supernova per galaxy every 50 years',
            famous: 'SN 1054 (created the Crab Nebula), SN 1987A, Kepler\'s Supernova (SN 1604)'
        },
        'pulsar': {
            name: 'Pulsars',
            image: 'https://cdn.mos.cms.futurecdn.net/7kCUkCxg6mAD2CXZ9kdKRa.jpg',
            description: 'A pulsar is a highly magnetized rotating neutron star that emits beams of electromagnetic radiation out of its magnetic poles. This radiation can be observed only when a beam of emission is pointing toward Earth.',
            facts: [
                'Pulsars rotate extremely rapidly, with periods from milliseconds to seconds.',
                'Pulsars were first discovered in 1967 by Jocelyn Bell Burnell.',
                'The fastest known pulsar rotates 716 times per second.',
                'Pulsars are extremely dense, with a mass greater than the Sun compressed into an object about 20 km in diameter.',
                'Pulsars slow down over time as they lose rotational energy.'
            ],
            types: 'Rotation-powered, Accretion-powered, Magnetars',
            detection: 'Detected primarily by radio telescopes as regular pulses of radiation',
            origin: 'Form from the collapsed cores of massive stars after supernova explosions',
            famous: 'Crab Pulsar, Vela Pulsar, PSR B1919+21 (first discovered)'
        },
        'quasar': {
            name: 'Quasars',
            image: 'https://www.worldatlas.com/r/w1200/upload/05/b3/f5/shutterstock-286396826.jpg',
            description: 'Quasars (quasi-stellar objects) are extremely luminous active galactic nuclei, powered by supermassive black holes. They are among the brightest objects in the universe.',
            facts: [
                'Quasars can emit energy equivalent to hundreds of galaxies combined.',
                'Quasars are typically found in the centers of young galaxies billions of light-years away.',
                'The first quasar was discovered in 1963 by astronomer Maarten Schmidt.',
                'Quasars appear star-like because their extreme brightness outshines their host galaxies.',
                'Quasars were more common in the early universe than they are today.'
            ],
            power: 'Powered by supermassive black holes accreting matter',
            distance: 'Most are billions of light-years away, showing us the early universe',
            lifespan: 'Active for about 10-100 million years',
            famous: '3C 273 (first discovered), APM 08279+5255 (one of the most luminous)'
        },
        'dark-matter': {
            name: 'Dark Matter',
            image: 'https://media.sciencephoto.com/image/r9800110/800wm/R9800110-Dark_matter_map.jpg',
            description: 'Dark matter is a hypothetical form of matter that is thought to account for approximately 85% of the matter in the universe. It does not interact with the electromagnetic force and thus cannot be directly detected.',
            facts: [
                'Dark matter does not emit, absorb, or reflect light, making it invisible.',
                'Its existence is inferred from gravitational effects on visible matter and the cosmic microwave background.',
                'The nature of dark matter remains one of the biggest mysteries in modern physics.',
                'Leading candidates for dark matter include weakly interacting massive particles (WIMPs) and axions.',
                'Dark matter appears to form a network of filaments throughout the universe, with galaxies forming at the intersections.'
            ],
            detection: 'Inferred from gravitational effects on visible matter',
            composition: 'Unknown, but theorized to be composed of undiscovered subatomic particles',
            distribution: 'Forms a cosmic web structure throughout the universe',
            research: 'Studied through gravitational lensing, galaxy rotation curves, and cosmic microwave background'
        },
        'exoplanet': {
            name: 'Exoplanets',
            image: 'https://th.bing.com/th/id/OIP.AKv5q5_U-5GvJBfL5GYTmAHaFV?rs=1&pid=ImgDetMain',
            description: 'Exoplanets are planets that orbit stars outside our solar system. Since the first confirmed detection in 1992, thousands of exoplanets have been discovered.',
            facts: [
                'Over 5,000 exoplanets have been confirmed as of 2023, with thousands more candidates awaiting confirmation.',
                'Exoplanets come in a wide variety of sizes and compositions, from gas giants to rocky worlds.',
                'Some exoplanets orbit in the "habitable zone" of their stars, where liquid water could potentially exist on their surfaces.',
                'The closest known exoplanet is Proxima Centauri b, orbiting the nearest star to our Sun.',
                'Some exoplanets have extreme conditions, such as HD 189733b where it rains molten glass sideways in hypersonic winds.'
            ],
            types: 'Gas Giants, Super-Earths, Mini-Neptunes, Terrestrial, Hot Jupiters',
            detection: 'Discovered using transit method, radial velocity method, direct imaging, and gravitational microlensing',
            habitable: 'Some exist in their star\'s habitable zone, making them potential candidates for life',
            famous: 'TRAPPIST-1 system, Proxima Centauri b, Kepler-452b (Earth\'s "cousin")'
        }
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
        "Light from the Sun takes about 8 minutes to reach Earth.",
        "The Milky Way galaxy is moving through space at a rate of 2.1 million kilometers per hour.",
        "There is a water reservoir in space that contains 140 trillion times the amount of water in Earth's oceans.",
        "The Hubble Space Telescope has taken over 1.5 million observations since its launch in 1990.",
        "The largest asteroid, Ceres, is about 940 kilometers in diameter.",
        "The International Space Station travels at a speed of about 28,000 kilometers per hour.",
        "A neutron star can spin at a rate of 600 rotations per second.",
        "The Andromeda Galaxy is on a collision course with the Milky Way, expected to occur in about 4.5 billion years.",
        "There are more trees on Earth than stars in the Milky Way galaxy.",
        "The coldest place in the universe is the Boomerang Nebula, at -272°C, just 1 degree above absolute zero.",
        "The largest known structure in the universe is the Hercules-Corona Borealis Great Wall, spanning 10 billion light-years."
    ];
    
    // Cosmic scale descriptions
    const scaleDescriptions = [
        "At the planetary scale, we observe worlds ranging from small rocky bodies like Mercury to gas giants like Jupiter. Earth, our home, is just one of billions of planets in our galaxy alone.",
        "Stars are massive balls of plasma held together by gravity. Our Sun is a medium-sized star that provides energy for life on Earth. The largest stars can be over 1,700 times the size of our Sun.",
        "Nebulae are vast clouds of gas and dust in space, often spanning hundreds of light-years. They are the birthplaces of stars and planetary systems.",
        "Galaxies are massive collections of stars, gas, dust, and dark matter. Our Milky Way contains hundreds of billions of stars and is just one of trillions of galaxies in the observable universe.",
        "The observable universe extends about 93 billion light-years in diameter and contains all matter and energy we can theoretically observe. Beyond this cosmic horizon lies the unknown."
    ];
    
    // Glossary terms
    const glossaryTerms = [
        { term: "Asteroid", definition: "A small rocky body orbiting the Sun, typically in the asteroid belt between Mars and Jupiter." },
        { term: "Black Hole", definition: "A region of spacetime where gravity is so strong that nothing, not even light, can escape from it." },
        { term: "Comet", definition: "A small, icy object that, when close to the Sun, heats up and releases gas, producing a visible coma and sometimes a tail." },
        { term: "Dark Energy", definition: "A hypothetical form of energy that permeates all of space and tends to accelerate the expansion of the universe." },
        { term: "Dark Matter", definition: "A form of matter thought to account for approximately 85% of the matter in the universe and about 27% of its total mass-energy." },
        { term: "Exoplanet", definition: "A planet that orbits a star outside our solar system." },
        { term: "Galaxy", definition: "A huge collection of gas, dust, and billions of stars and their solar systems, held together by gravity." },
        { term: "Gravitational Lensing", definition: "The bending of light by massive objects in space, as predicted by Einstein's theory of general relativity." },
        { term: "Light-Year", definition: "The distance that light travels in one year, approximately 9.46 trillion kilometers." },
        { term: "Nebula", definition: "A cloud of gas and dust in outer space, visible in the night sky either as a luminous patch or as a dark silhouette against other luminous matter." },
        { term: "Neutron Star", definition: "The collapsed core of a massive star that has undergone a supernova explosion." },
        { term: "Pulsar", definition: "A rotating neutron star that emits regular pulses of radio waves and other electromagnetic radiation." },
        { term: "Quasar", definition: "An extremely luminous active galactic nucleus, powered by a supermassive black hole." },
        { term: "Red Giant", definition: "A luminous giant star of low or intermediate mass that has exhausted its hydrogen fuel." },
        { term: "Supernova", definition: "The explosion of a star, causing it to suddenly increase greatly in brightness." },
        { term: "White Dwarf", definition: "A small, very dense star that is typically the size of a planet. It is formed when a low-mass star has exhausted its nuclear fuel." }
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
    
    // View toggle functionality
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Update active button
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show the selected view
            if (view === '3d') {
                solarSystem3D.classList.add('active-view');
                planetsList.classList.remove('active-view');
                
                // Initialize Three.js if not already done
                if (solarSystem3D.innerHTML === '') {
                    initThreeJS();
                }
            } else {
                solarSystem3D.classList.remove('active-view');
                planetsList.classList.add('active-view');
            }
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
    
    // Generate glossary
    function generateGlossary() {
        const glossaryItems = document.getElementById('glossary-items');
        glossaryItems.innerHTML = '';
        
        glossaryTerms.sort((a, b) => a.term.localeCompare(b.term)).forEach(item => {
            const glossaryItem = document.createElement('div');
            glossaryItem.className = 'glossary-item';
            glossaryItem.innerHTML = `
                <h4>${item.term}</h4>
                <p>${item.definition}</p>
            `;
            glossaryItems.appendChild(glossaryItem);
        });
    }
    
    // Glossary search
    const glossarySearch = document.getElementById('glossary-search');
    glossarySearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        const glossaryItems = document.querySelectorAll('.glossary-item');
        
        glossaryItems.forEach(item => {
            const term = item.querySelector('h4').textContent.toLowerCase();
            const definition = item.querySelector('p').textContent.toLowerCase();
            
            if (term.includes(searchTerm) || definition.includes(searchTerm) || searchTerm === '') {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    // Three.js implementation
    function initThreeJS() {
        // Create scene
        const scene = new THREE.Scene();
        
        // Create camera
        const camera = new THREE.PerspectiveCamera(75, solarSystem3D.clientWidth / solarSystem3D.clientHeight, 0.1, 1000);
        camera.position.z = 50;
        
        // Create renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(solarSystem3D.clientWidth, solarSystem3D.clientHeight);
        renderer.setClearColor(0x000000, 0);
        solarSystem3D.appendChild(renderer.domElement);
        
        // Add orbit controls
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        
        // Add point light (sun)
        const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
        scene.add(pointLight);
        
        // Create sun
        const sunGeometry = new THREE.SphereGeometry(10, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffcc00,
            emissive: 0xffcc00,
            emissiveIntensity: 1
        });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        scene.add(sun);
        
        // Planet data for Three.js
        const planetInfo = [
            { name: 'Mercury', radius: 0.8, distance: 20, color: 0xa5a5a5, speed: 0.04 },
            { name: 'Venus', radius: 1.2, distance: 25, color: 0xe8cda7, speed: 0.015 },
            { name: 'Earth', radius: 1.3, distance: 30, color: 0x4ca7e8, speed: 0.01 },
            { name: 'Mars', radius: 1.0, distance: 35, color: 0xe27b58, speed: 0.008 },
            { name: 'Jupiter', radius: 3.5, distance: 45, color: 0xe0ae6f, speed: 0.002 },
            { name: 'Saturn', radius: 3.0, distance: 55, color: 0xe8d080, speed: 0.0009 },
            { name: 'Uranus', radius: 2.0, distance: 65, color: 0xa5d2e0, speed: 0.0004 },
            { name: 'Neptune', radius: 1.9, distance: 75, color: 0x5580e0, speed: 0.0001 }
        ];
        
        // Create planets
        const planets3D = [];
        const orbits = [];
        
        planetInfo.forEach(planet => {
            // Create orbit
            const orbitGeometry = new THREE.RingGeometry(planet.distance - 0.1, planet.distance + 0.1, 64);
            const orbitMaterial = new THREE.MeshBasicMaterial({ 
                color: 0xffffff, 
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.1
            });
            const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
            orbit.rotation.x = Math.PI / 2;
            scene.add(orbit);
            orbits.push(orbit);
            
            // Create planet
            const planetGeometry = new THREE.SphereGeometry(planet.radius, 32, 32);
            const planetMaterial = new THREE.MeshLambertMaterial({ color: planet.color });
            const planet3D = new THREE.Mesh(planetGeometry, planetMaterial);
            
            // Position planet
            planet3D.position.x = planet.distance;
            
            // Add planet to scene and array
            scene.add(planet3D);
            planets3D.push({
                mesh: planet3D,
                speed: planet.speed,
                distance: planet.distance,
                angle: Math.random() * Math.PI * 2
            });
            
            // Add planet label
            const planetDiv = document.createElement('div');
            planetDiv.className = 'planet-label';
            planetDiv.textContent = planet.name;
            planetDiv.style.position = 'absolute';
            planetDiv.style.color = 'white';
            planetDiv.style.fontSize = '12px';
            planetDiv.style.fontFamily = 'Orbitron, sans-serif';
            planetDiv.style.textShadow = '0 0 5px rgba(0,0,0,0.5)';
            planetDiv.style.pointerEvents = 'none';
            solarSystem3D.appendChild(planetDiv);
            
            // Store label with planet
            planets3D[planets3D.length - 1].label = planetDiv;
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            camera.aspect = solarSystem3D.clientWidth / solarSystem3D.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(solarSystem3D.clientWidth, solarSystem3D.clientHeight);
        });
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            // Rotate sun
            sun.rotation.y += 0.001;
            
            // Update planets
            planets3D.forEach(planet => {
                // Update angle
                planet.angle += planet.speed;
                
                // Update position
                planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
                planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;
                
                // Rotate planet
                planet.mesh.rotation.y += planet.speed * 10;
                
                // Update label position
                const vector = new THREE.Vector3();
                vector.setFromMatrixPosition(planet.mesh.matrixWorld);
                vector.project(camera);
                
                const x = (vector.x * 0.5 + 0.5) * solarSystem3D.clientWidth;
                const y = (-(vector.y * 0.5) + 0.5) * solarSystem3D.clientHeight;
                
                planet.label.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
                
                // Hide label if planet is behind the camera
                if (vector.z > 1) {
                    planet.label.style.display = 'none';
                } else {
                    planet.label.style.display = 'block';
                    // Scale opacity based on distance from camera
                    const opacity = 1 - (vector.z + 1) / 2;
                    planet.label.style.opacity = opacity > 0 ? opacity : 0;
                }
            });
            
            controls.update();
            renderer.render(scene, camera);
        }
        
        animate();
    }
    
    // Initialize the page
    showSection(homeSection);
});