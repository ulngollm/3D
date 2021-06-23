import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

//размеры холста
const canvas = document.querySelector('canvas');
const height = window.innerHeight;
const width = window.innerWidth;
canvas.setAttribute('width', window.innerWidth);
canvas.setAttribute('height', window.innerHeight);

//обязательные объекты
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 20, 2000);
camera.position.set(0, 0, 500);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
scene.background = new THREE.Color(0xffffff);

//controls
const controls = new OrbitControls(camera, canvas);
controls.enablePan = false;
controls.maxPolarAngle = Math.PI;
controls.enableDamping = true;
controls.dampingFactor = 0.1;

//light
const color = 0xFFFFFF;
const intensity = 0.5;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

//объекты сцены
const geometry = new THREE.TorusKnotGeometry(80, 30, 50, 15,4);
const material = new THREE.MeshPhongMaterial({color: 0xd300ff, flatShading: true});
material.shininess = 1000;
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

//settings gui
let params = {
    rotationX:0,
    rotationY:0,
    rotationZ:0,
    positionX:0,
    positionY:0,
    positionZ:0,
}

const gui = new dat.GUI();
gui.add(params, 'rotationX').min(-0.2).max(0.2).step(0.001);
gui.add(params, 'rotationY').min(-0.2).max(0.2).step(0.001);
gui.add(params, 'rotationZ').min(-0.2).max(0.2).step(0.001);
gui.add(params, 'positionX').min(-5).max(5).step(0.1);
gui.add(params, 'positionY').min(-5).max(5).step(0.1);
gui.add(params, 'positionZ').min(-5).max(5).step(0.1);
gsap.fromTo(torus.position, {y: -20}, {y: 20, duration: 1,  yoyo: true, repeat: -1});
gsap.to(torus.rotation, {z: -Math.PI/2, duration: 2,  yoyo: true, repeat: -1, easing:'sine.inOut'});
gsap.to(torus.position, {x: 20, duration: 2,  yoyo: true, repeat: -1, easing:'sine'});
function animateObject(time){
    torus.rotation.x += params.rotationX;
    torus.rotation.y += params.rotationY;
    torus.rotation.z += params.rotationZ;
    torus.position.x += params.positionX;
    torus.position.y += params.positionY;
    torus.position.z += params.positionZ;
    
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animateObject);
}

requestAnimationFrame(animateObject);