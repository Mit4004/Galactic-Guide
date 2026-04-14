// Interactive 3D Galaxy Scene
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('three-container');
    if (!container || typeof THREE === 'undefined') return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Add subtle fog to blend the edges of the galaxy
    scene.fog = new THREE.FogExp2(0x000000, 0.001);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 2000);
    camera.position.set(0, 150, 400);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Controls
    let controls;
    if (THREE.OrbitControls) {
       controls = new THREE.OrbitControls(camera, renderer.domElement);
    } else if (window.OrbitControls) {
       controls = new window.OrbitControls(camera, renderer.domElement);
    }

    if (controls) {
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.maxDistance = 1000;
        controls.minDistance = 50;
        // Don't allow going below the "plane" too much
        controls.maxPolarAngle = Math.PI / 2 + 0.3;
    }

    // Creating the Galaxy Particle System
    const particleCount = 15000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const colorInside = new THREE.Color(0xffaa55); // Warm core
    const colorOutside = new THREE.Color(0x3366ff); // Blue arms
    
    const arms = 5; // Number of galaxy spiral arms
    const spin = 3; // How much the arms twist
    const maxRadius = 300;

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Radius with exponential dropoff (more particles at center)
        const radius = Math.pow(Math.random(), 1.5) * maxRadius;
        
        // Angle based on radius (spiraling)
        const spinAngle = radius * spin / maxRadius;
        
        // Which arm this particle belongs to
        const branchAngle = (i % arms) * ((Math.PI * 2) / arms);
        
        // Random spread from the arm line
        const randomX = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 20 * (maxRadius / (radius + 20));
        const randomY = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 10 * (maxRadius / (radius + 20));
        const randomZ = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 20 * (maxRadius / (radius + 20));
        
        // Calculate position
        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
        
        // Calculate color based on distance from center
        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / maxRadius);
        
        // Add some random variation to color
        colors[i3] = mixedColor.r + (Math.random() * 0.2 - 0.1);
        colors[i3 + 1] = mixedColor.g + (Math.random() * 0.2 - 0.1);
        colors[i3 + 2] = mixedColor.b + (Math.random() * 0.2 - 0.1);
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Create material for the particles
    const createCircleTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext('2d');
        const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 32, 32);
        
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    };
    
    const material = new THREE.PointsMaterial({
        size: 3,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false, // Ensures particles don't occlude each other
        transparent: true,
        opacity: 0.8,
        map: createCircleTexture()
    });
    
    const galaxy = new THREE.Points(geometry, material);
    scene.add(galaxy);

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
        requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();
        
        // Slowly rotate the whole galaxy over time
        galaxy.rotation.y = elapsedTime * 0.05;
        
        if (controls) controls.update();
        
        renderer.render(scene, camera);
    };

    // Handle window resize
    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Start animation
    animate();
});
