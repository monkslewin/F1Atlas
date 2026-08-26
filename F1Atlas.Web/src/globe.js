import * as THREE from "three";

let scene;
let camera;
let renderer;
let globe;

export function initGlobe(container) {

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );

    camera.position.z = 3;

    // Renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    // Globe
    const geometry = new THREE.SphereGeometry(
        1,
        64,
        64
    );

    const material = new THREE.MeshStandardMaterial({
        color: 0x2266aa
    });

    globe = new THREE.Mesh(
        geometry,
        material
    );

    scene.add(globe);

    // Lighting
    const ambientLight = new THREE.AmbientLight(
        0xffffff,
        1
    );

    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
        0xffffff,
        2
    );

    directionalLight.position.set(5, 3, 5);

    scene.add(directionalLight);

    // Start rendering
    animate();
}

function animate() {

    requestAnimationFrame(animate);

    // Rotate globe
    globe.rotation.y += 0.002;

    renderer.render(
        scene,
        camera
    );
}

window.globe = {
    initGlobe
};

