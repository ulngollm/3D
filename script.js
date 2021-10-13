import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

const canvas = document.querySelector("canvas");
const height = window.innerHeight;
const width = window.innerWidth;
canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

//обязательные объекты
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(15, width / height, 10, 2000);
camera.position.set(0, 0, 50);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
scene.background = new THREE.Color(0xffffff);

//controls
const controls = new OrbitControls(camera, canvas);
controls.enablePan = false;
controls.maxPolarAngle = Math.PI;
controls.enableDamping = true;
controls.dampingFactor = 0.1;

//light
const color = 0xffffff;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(0,10,10);
scene.add(light);

const loader = new GLTFLoader();
loader.load('assets/panda.gltf', (gltf) => {
    let panda = gltf.scene;
    panda.rotation.x = Math.PI / 2;
    panda.rotation.y = Math.PI;
    scene.add(panda);
});

loader.load('assets/burger.gltf', (gltf) => {
    let burger = gltf.scene;
    burger.position.set(3, 2, 0)
    scene.add(burger);
});

loader.load('assets/duck.gltf', (gltf) => {
    let bird = gltf.scene;
    console.log(gltf);
    bird.scale.set(20,20,20)
    // bird.position.set(0, 0, -50)
    // scene.add(bird);
});

function render() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);

}
requestAnimationFrame(render);
