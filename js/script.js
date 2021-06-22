import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
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
//light
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

//объекты сцены
let geometry = new THREE.SphereGeometry(150, 30, 9);
let material = new THREE.MeshPhongMaterial({
    color: 0x3e1d00,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
sphere.visible = false;

const cubeGeometry = new THREE.TorusKnotGeometry(80, 30, 50, 15,4);

const cube = new THREE.Mesh(cubeGeometry, material);
scene.add(cube);

let params = {
    rotationX:0,
    rotationY:0,
    rotationZ:0,
    positionX:0,
    positionY:0,
    positionZ:0,
}
function animateObject(time){
    // console.log(time);
    cube.rotation.x += params.rotationX;
    cube.rotation.y += params.rotationY;
    cube.rotation.z += params.rotationZ;
    cube.position.x += params.positionX;
    cube.position.y += params.positionY;
    cube.position.z += params.positionZ;

    renderer.render(scene, camera);
    requestAnimationFrame(animateObject);
}
requestAnimationFrame(animateObject);

const gui = new dat.GUI();
gui.add(params, 'rotationX').min(-0.2).max(0.2).step(0.001);
gui.add(params, 'rotationY').min(-0.2).max(0.2).step(0.001);
gui.add(params, 'rotationZ').min(-0.2).max(0.2).step(0.001);
gui.add(params, 'positionX').min(-5).max(5).step(0.1);
gui.add(params, 'positionY').min(-5).max(5).step(0.1);
gui.add(params, 'positionZ').min(-5).max(5).step(0.1);

const controls = new OrbitControls(camera, canvas);
console.log(renderer);