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

    // Controls
    controls = new OrbitControls(
        camera,
        renderer.domElement
    );

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

    const material = new THREE.MeshBasicMaterial({
        map: earthTexture
    });

    globe = new THREE.Mesh(
        geometry,
        material
    );

    // Test Albert Park coordinates
    const albertParkPoint = latLonToVector3(
        -37.8497,
        144.9683
    );

    console.log(albertParkPoint);

    scene.add(globe);

    // Start rendering
    animate();
}

function latLonToVector3(latitude, longitude) {

    const radius = 1;

    const latitudeRad =
        latitude * Math.PI / 180;

    const longitudeRad =
        longitude * Math.PI / 180;

    const x =
        radius *
        Math.cos(latitudeRad) *
        Math.cos(longitudeRad);

    const y =
        radius *
        Math.sin(latitudeRad);

    const z =
        radius *
        Math.cos(latitudeRad) *
        Math.sin(longitudeRad);

    return new THREE.Vector3(
        x,
        y,
        z
    );
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