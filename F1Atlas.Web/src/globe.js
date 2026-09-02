import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let scene;
let camera;
let renderer;
let globe;
let controls;
let markerGroup;
let globeGroup;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let markers = [];

let dotNetReference;

export function initGlobe(container, circuits, dotNetRef) {

    dotNetReference = dotNetRef;

    // --------------------------------------------------
    // Scene
    // --------------------------------------------------

    scene = new THREE.Scene();

    globeGroup = new THREE.Group();
    markerGroup = new THREE.Group();

    globeGroup.add(markerGroup);
    scene.add(globeGroup);

    // --------------------------------------------------
    // Camera
    // --------------------------------------------------

    camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );

    camera.position.z = 3;

    // --------------------------------------------------
    // Renderer
    // --------------------------------------------------

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    renderer.domElement.addEventListener(
        "click",
        onMouseClick
    );

    // --------------------------------------------------
    // Controls
    // --------------------------------------------------

    controls = new OrbitControls(
        camera,
        renderer.domElement
    );

    // --------------------------------------------------
    // Stars
    // --------------------------------------------------

    const starGeometry = new THREE.BufferGeometry();

    const starCount = 15000;

    const positions = new Float32Array(
        starCount * 3
    );

    for (let i = 0; i < starCount * 3; i++) {

        positions[i] =
            (Math.random() - 0.5) * 100;
    }

    starGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );

    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.05
    });

    const stars = new THREE.Points(
        starGeometry,
        starMaterial
    );

    scene.add(stars);

    // --------------------------------------------------
    // Globe
    // --------------------------------------------------

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

    globeGroup.add(globe);

    // --------------------------------------------------
    // Markers
    // --------------------------------------------------

    createMarkers(circuits);

    // --------------------------------------------------
    // Start rendering
    // --------------------------------------------------

    animate();
}

function createMarkers(circuits) {

    for (const circuit of circuits) {

        const point = latLonToVector3(
            circuit.latitude,
            circuit.longitude
        );

        const markerGeometry = new THREE.SphereGeometry(
            0.015,
            16,
            16
        );

        const markerMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000
        });

        const marker = new THREE.Mesh(
            markerGeometry,
            markerMaterial
        );

        marker.userData = {
            circuitName: circuit.name,
            circuitId: circuit.id
        };

        marker.position.copy(point);

        markers.push(marker);

        markerGroup.add(marker);
    }
}

function latLonToVector3(
    latitude,
    longitude
) {

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
        -radius *
        Math.cos(latitudeRad) *
        Math.sin(longitudeRad);

    return new THREE.Vector3(
        x,
        y,
        z
    );
}

function onMouseClick(event) {

    const rect =
        renderer.domElement.getBoundingClientRect();

    mouse.x =
        ((event.clientX - rect.left) / rect.width) * 2 - 1;

    mouse.y =
        -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(
        mouse,
        camera
    );

    const intersects = raycaster.intersectObjects(markers);

    if (intersects.length === 0) {
        return;
    }

    const marker =
        intersects[0].object;

    dotNetReference.invokeMethodAsync(
        "CircuitClicked",
        marker.userData.circuitName,
        marker.userData.circuitId
    );
}

export function updateCircuits(circuits) {

    markerGroup.clear();

    markers.length = 0;

    createMarkers(circuits);
}

function animate() {

    requestAnimationFrame(animate);

    renderer.render(
        scene,
        camera
    );
}

function setGlobeScale(scale) {
    globeGroup.scale.set(
        scale,
        scale,
        scale
    );
}

function startYearTransition() {

    return new Promise(resolve => {

        const startScale = globeGroup.scale.x;
        const targetScale = 0.05;
        const duration = 400;

        const startTime = performance.now();

        function animateScale(currentTime) {

            const elapsed = currentTime - startTime;
            const progress = Math.min(
                elapsed / duration,
                1
            );

            const scale =
                startScale +
                (targetScale - startScale) * progress;

            globeGroup.scale.set(
                scale,
                scale,
                scale
            );

            if (progress < 1) {

                requestAnimationFrame(
                    animateScale
                );

            } else {

                resolve();
            }
        }

        requestAnimationFrame(
            animateScale
        );
    });
};

function finishYearTransition() {

    return new Promise(resolve => {

        const startScale = globeGroup.scale.x;
        const targetScale = 1;
        const duration = 400;

        const startTime = performance.now();

        function animateScale(currentTime) {

            const elapsed = currentTime - startTime;
            const progress = Math.min(
                elapsed / duration,
                1
            );

            const scale =
                startScale +
                (targetScale - startScale) * progress;

            globeGroup.scale.set(
                scale,
                scale,
                scale
            );

            if (progress < 1) {

                requestAnimationFrame(
                    animateScale
                );

            } else {

                resolve();
            }
        }

        requestAnimationFrame(
            animateScale
        );
    });
};

window.globe = {
    initGlobe,
    updateCircuits,
    setGlobeScale,
    startYearTransition,
    finishYearTransition
};