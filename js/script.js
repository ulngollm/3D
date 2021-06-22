import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import {
    OrbitControls
} from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import {
    GLTFLoader
} from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js';
const canvas = document.querySelector('canvas');
const height = window.innerHeight;
const width = 600;
canvas.setAttribute('width', width);
canvas.setAttribute('height', height);

//обязательные объекты
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, width / height, 20, 2000);
camera.position.set(0, 0, 300);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    premultipliedAlpha: false,
});

//import
const gltfLoader = new GLTFLoader();
let dna = null;
gltfLoader.load('assets/dna/scene.gltf', (gltf) => {
    console.log(gltf);
    dna = gltf.scene;
    dna.scale.set(3,3,3)
    dna.position.y = -40;
    dna.rotation.x = Math.PI / 8;
    dna.rotation.z = Math.PI / 10;


    scene.add(dna);

    function animateObject(time) {
        rotate(dna);
        renderer.render(scene, camera);
        controls.update();
        requestAnimationFrame(animateObject);
    }
    requestAnimationFrame(animateObject);

});

//controls
const controls = new OrbitControls(camera, canvas);
controls.enablePan = false;
controls.maxPolarAngle = Math.PI;
controls.enableDamping = true;
controls.enableZoom = false;
controls.dampingFactor = 0.1;
console.log(dna);

//light
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.HemisphereLight(color, intensity);
light.position.set(1, -10, 10);
scene.add(light);

const rotateSpeed = Math.PI / 600;
function rotate(obj) {
    obj.rotation.y += rotateSpeed;
}