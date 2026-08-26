import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let scene;
let camera;
let renderer;
let globe;
let controls;


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

    // controls
     controls = new OrbitControls(
        camera,
        renderer.domElement
    )

    // Globe
    const geometry = new THREE.SphereGeometry(
        1,
        64,
        64
    );
    const textureLoader = new THREE.TextureLoader();

    const earthTexture = textureLoader.load(
        "/textures/earth.jpg"
    );

    const material = new THREE.MeshStandardMaterial({
        map: earthTexture
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

   

    renderer.render(
        scene,
        camera
    );
}

window.globe = {
    initGlobe
};

