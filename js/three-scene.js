document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('three-container');
    const btnMilkyWay = document.getElementById('btn-milky-way');
    const btnSolarSystem = document.getElementById('btn-solar-system');
    
    if (!container || typeof THREE === 'undefined') return;

    let currentMode = 'galaxy'; // 'galaxy' or 'solar-system'
    let planets = []; // to hold planets for animation
    let activeMeshes = []; // to clean up exactly what we added

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.001);

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 5000);
    camera.position.set(0, 150, 400);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    let controls;
    if (THREE.OrbitControls) {
       controls = new THREE.OrbitControls(camera, renderer.domElement);
    } else if (window.OrbitControls) {
       controls = new window.OrbitControls(camera, renderer.domElement);
    }

    if (controls) {
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.maxDistance = 2000;
        controls.minDistance = 20;
    }

    function clearScene() {
        activeMeshes.forEach(mesh => {
            scene.remove(mesh);
            if(mesh.geometry) mesh.geometry.dispose();
            if(mesh.material) {
                if(Array.isArray(mesh.material)) {
                    mesh.material.forEach(m => m.dispose());
                } else {
                    mesh.material.dispose();
                }
            }
        });
        activeMeshes = [];
        planets = [];
        
        const lights = scene.children.filter(c => c.isLight);
        lights.forEach(l => scene.remove(l));
    }

    const createCircleTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext('2d');
        const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 32, 32);
        
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    };
    const circleTexture = createCircleTexture();

    let galaxySystem;
    function createMilkyWay() {
        clearScene();
        
        const particleCount = 25000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        const colorCore = new THREE.Color(0xfffbcc); // Warm white/yellow core
        const colorArms = new THREE.Color(0x4488ff); // Blue arms
        
        const arms = 2; // Milky Way has 2 main major arms
        const spin = 3.5; 
        const maxRadius = 350;

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            const radius = Math.pow(Math.random(), 1.5) * maxRadius;
            
            let branchAngle = 0;
            let currentSpin = spin;
            
            if (radius < 40) {
                branchAngle = (Math.random() * Math.PI * 2);
                currentSpin = 0; // less spin in the core
            } else {
                branchAngle = (i % arms) * ((Math.PI * 2) / arms);
            }
            
            const spinAngle = radius * currentSpin / maxRadius;
            
            const randomX = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 20 * (maxRadius / (radius + 20));
            const randomY = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 6 * (maxRadius / (radius + 20));
            const randomZ = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 20 * (maxRadius / (radius + 20));
            
            positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3 + 1] = randomY;
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
            
            const mixedColor = colorCore.clone();
            mixedColor.lerp(colorArms, radius / maxRadius);
            
            if (Math.random() > 0.98) {
                mixedColor.setHex(0xffffff);
            }
            
            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 2.5,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false, 
            transparent: true,
            opacity: 0.9,
            map: circleTexture
        });
        
        galaxySystem = new THREE.Points(geometry, material);
        scene.add(galaxySystem);
        activeMeshes.push(galaxySystem);
        
        camera.position.set(0, 200, 450);
        if(controls) {
            controls.target.set(0, 0, 0);
            controls.maxPolarAngle = Math.PI / 2 + 0.3;
        }
    }

    let solarSystemGroup;
    function createSolarSystem() {
        clearScene();
        
        solarSystemGroup = new THREE.Group();
        scene.add(solarSystemGroup);
        activeMeshes.push(solarSystemGroup);
        
        const ambientLight = new THREE.AmbientLight(0x222222);
        scene.add(ambientLight);
        
        const sunLight = new THREE.PointLight(0xffffff, 2, 1000);
        sunLight.position.set(0, 0, 0);
        scene.add(sunLight);
        
        const planetData = [
            { name: "Mercury", color: 0xaaaaaa, size: 2, distance: 30, speed: 0.04 },
            { name: "Venus", color: 0xffcc99, size: 4, distance: 50, speed: 0.015 },
            { name: "Earth", color: 0x3366ff, size: 4.5, distance: 75, speed: 0.01 },
            { name: "Mars", color: 0xff3300, size: 3, distance: 100, speed: 0.008 },
            { name: "Jupiter", color: 0xcc9966, size: 12, distance: 160, speed: 0.002 },
            { name: "Saturn", color: 0xe6b800, size: 10, distance: 230, speed: 0.0009, hasRings: true },
            { name: "Uranus", color: 0x66ccff, size: 7, distance: 300, speed: 0.0004 },
            { name: "Neptune", color: 0x3333ff, size: 6.5, distance: 360, speed: 0.0001 }
        ];

        const sunGeom = new THREE.SphereGeometry(15, 32, 32);
        const sunMat = new THREE.MeshBasicMaterial({ 
            color: 0xffdd44,
            map: circleTexture
        });
        const sun = new THREE.Mesh(sunGeom, sunMat);
        solarSystemGroup.add(sun);
        
        const sunGlowGeom = new THREE.SphereGeometry(20, 32, 32);
        const sunGlowMat = new THREE.MeshBasicMaterial({
            color: 0xffaa00,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide
        });
        const sunGlow = new THREE.Mesh(sunGlowGeom, sunGlowMat);
        solarSystemGroup.add(sunGlow);

        planetData.forEach((data, index) => {
            const ringGeom = new THREE.RingGeometry(data.distance - 0.2, data.distance + 0.2, 64);
            const ringMat = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
            const ring = new THREE.Mesh(ringGeom, ringMat);
            ring.rotation.x = Math.PI / 2;
            solarSystemGroup.add(ring);
            
            const orbitObj = new THREE.Object3D();
            
            orbitObj.rotation.y = Math.random() * Math.PI * 2;
            
            solarSystemGroup.add(orbitObj);
            
            const pGeom = new THREE.SphereGeometry(data.size, 32, 32);
            const pMat = new THREE.MeshStandardMaterial({ 
                color: data.color, 
                roughness: 0.4,
                metalness: 0.1
            });
            const planetMesh = new THREE.Mesh(pGeom, pMat);
            planetMesh.position.x = data.distance;
            orbitObj.add(planetMesh);
            
            if (data.hasRings) {
                const saturnRingGeom = new THREE.RingGeometry(data.size * 1.4, data.size * 2.2, 32);
                const saturnRingMat = new THREE.MeshBasicMaterial({ color: 0xe6b800, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
                const saturnRing = new THREE.Mesh(saturnRingGeom, saturnRingMat);
                saturnRing.rotation.x = Math.PI / 2 + 0.2; // Slight tilt
                planetMesh.add(saturnRing);
            }
            
            planets.push({
                obj: orbitObj, // This container revolves around the sun
                mesh: planetMesh, // This mesh rotates on its own axis
                speed: data.speed,
                rotSpeed: (Math.random() * 0.02) + 0.01
            });
        });

        camera.position.set(0, 200, 400);
        if(controls) {
            controls.target.set(0, 0, 0);
            controls.maxPolarAngle = Math.PI; // Allow viewing from bottom
        }
    }

    function setActiveButton(activeId) {
        if(btnMilkyWay) {
            btnMilkyWay.classList.remove('active');
            btnMilkyWay.style.borderColor = 'transparent';
        }
        if(btnSolarSystem) {
            btnSolarSystem.classList.remove('active');
            btnSolarSystem.style.borderColor = 'transparent';
        }
        
        const activeBtn = document.getElementById(activeId);
        if(activeBtn) {
            activeBtn.classList.add('active');
            activeBtn.style.borderColor = '#8af';
        }
    }

    if(btnMilkyWay) {
        btnMilkyWay.addEventListener('click', () => {
            if(currentMode === 'galaxy') return;
            currentMode = 'galaxy';
            setActiveButton('btn-milky-way');
            createMilkyWay();
        });
    }

    if(btnSolarSystem) {
        btnSolarSystem.addEventListener('click', () => {
            if(currentMode === 'solar-system') return;
            currentMode = 'solar-system';
            setActiveButton('btn-solar-system');
            createSolarSystem();
        });
    }

    createMilkyWay();

    const clock = new THREE.Clock();

    const animate = () => {
        requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();
        
        if (currentMode === 'galaxy' && galaxySystem) {
            galaxySystem.rotation.y = elapsedTime * 0.05;
        } else if (currentMode === 'solar-system') {
            planets.forEach(p => {
                p.obj.rotation.y -= p.speed; // Orbit
                p.mesh.rotation.y += p.rotSpeed; // Rotate independently
            });
        }
        
        if (controls) controls.update();
        
        renderer.render(scene, camera);
    };

    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    animate();
});
