import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webgl-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Enable tone mapping for HDR
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;

document.body.appendChild(renderer.domElement);

// Add controls to move the camera around
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth damping for the camera
camera.position.set(0, 1, 5);
controls.update();

// Load the HDR environment using RGBELoader
const rgbeLoader = new RGBELoader();
rgbeLoader.load('cinema_lobby_4k.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    scene.background = texture;
});

// Define your text element for hovering
const textElement = document.createElement('div');
textElement.style.position = 'absolute'; 
textElement.style.color = 'white'; 
textElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; 
textElement.style.padding = '5px'; 
textElement.style.borderRadius = '5px'; 
textElement.style.pointerEvents = 'none'; 
document.body.appendChild(textElement); 
textElement.style.display = 'none'; // Hide initially

// Create video textures and planes
const createVideoPlane = (videoSrc, width, height, position, rotationY = 0, label) => {
    const video = document.createElement('video');
    video.src = videoSrc;
    video.muted = true;
    video.loop = true;
    video.play();

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;

    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(position.x, position.y, position.z);
    plane.rotation.y = rotationY;
    plane.userData = { label };

    scene.add(plane);
    return plane;
};

// Create video planes with specified rotations and labels
const planes = [];
planes.push(createVideoPlane('/videos/video4.mp4', 4, 2.25, { x: -6, y: 1, z: -3 }, Math.PI / 2, 'Lensvelt Contract B.V. Boring collection'));
planes.push(createVideoPlane('/videos/video1.mp4', 4, 2.25, { x: -3, y: 1, z: 0 }, 0, 'Federico D’Orazio: O'));
planes.push(createVideoPlane('/videos/video2.mp4', 4, 2.25, { x: 3, y: 1, z: 0 }, 0, 'Irma Boom: The Architecture of the Book Books in reverse chronological order 2013 – 1986'));
planes.push(createVideoPlane('/videos/video3.mp4', 4, 2.25, { x: 6, y: 1, z: -3 }, Math.PI / 2, 'Irma Boom: The Architecture of the Book Books in reverse chronological order 2013 – 1986'));
planes.push(createVideoPlane('/videos/video5.mp4', 4, 2.25, { x: -3, y: 1, z: -6 }, Math.PI, 'Swip Stolk. Is getekent ‘Zwart op wit’'));



// Raycasting for mouse interactions
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Update text position on hover
function updateTextPosition() {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planes);

    if (intersects.length > 0) {
        const intersectedPlane = intersects[0].object;
        textElement.style.display = 'block';
        textElement.innerHTML = intersectedPlane.userData.label; // Show label

        const pos = new THREE.Vector3();
        intersectedPlane.getWorldPosition(pos);
        const screenPosition = pos.project(camera);
        const x = (screenPosition.x * 0.5 + 0.5) * window.innerWidth;
        const y = (screenPosition.y * -0.5 + 0.5) * window.innerHeight;

        textElement.style.left = `${x}px`;
        textElement.style.top = `${y}px`;
    } else {
        textElement.style.display = 'none'; // Hide text if not hovering
    }
}

// Mouse move event listener to update text on hover
window.addEventListener('mousemove', updateTextPosition);

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// Adding the scrolling text dynamically using JavaScript
const scrollingText = document.getElementById('scrolling-text');
scrollingText.innerHTML = '<span> Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition Repetition On of an image. The cycle of life of an image. Images are meant to circulate. An image of an image, a catalog of things, a catalog of catalogs of things. Images are a representation, they are being created or taken, often with an intention of sharing. After initial sharing they are distributed, copied, archived, scanned, photographed, screenshotted, rediscovered, reprinted, printed from the digital, scanned again to go back, scanned from physical and then printed again. The lifespan of an image varies a lot depending on whether its meant to exist online or IRL. Images on the internet are copied and shared vastly more than in print due to the ease and speed of digital reproduction, with viral images reaching millions of copies and iterations. There’s so much content, yet we tend to repeat ourselves with the desire to create, to categorize, to sample, and remix what already exists. Can an image be reproduced objectively or is the person re-representing it becoming a new author? Initially, the sign (image or representation) is a reflection of basic reality; in a later stage, the image masks basic reality, becoming a distortion of it. In the third stage, the sign masks the absence of basic reality, questioning what reality is and whether it even exists. In stage four, the sign bears no relation to any reality whatsoever—it is its own pure simulacrum. This is *Simulation and Simulacra*, a philosophical discourse by Jean Baudrillard, explained in short. This is also how I see the repetition of an image (or text) in action. In order to create something new, we strip away meaning further and further. We aim to represent something, but with every step, we move farther from the pure form, idea, or reality. Is there a way to represent without losing the core? Direct representation of an object only multiplies its existence, so why is the existence of the real object not enough? The human urge to categorize, catalog, and archive everything is creating content for the sake of content. Alternatively, with such an enormous amount of content already, categorizing it provides an entry to a world overflowing with production. You can place any information here, like news, updates, or important announcements.</span>';
