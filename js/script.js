import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import {
    OrbitControls
} from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import {
    GLTFLoader
} from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js';
const canvas = document.querySelector('canvas');
const height = window.innerHeight;
const width = window.innerWidth;
canvas.setAttribute('width', width);
canvas.setAttribute('height', height);

//обязательные объекты
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 5, 2000);
camera.position.set(0, 0, 100);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    // premultipliedAlpha: false,
});
// scene.background = new THREE.Color(0xB1E1FF);

//create objects
const cylinderGeometry = new THREE.CylinderGeometry(5, 5, 2, 12);
const whiteMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff
});
const pill = new THREE.Mesh(cylinderGeometry, whiteMaterial);
pill.rotation.x = Math.PI / 4;
// cylinder.position.x = 100;
// scene.add(pill);

const pill2 = new THREE.Mesh(cylinderGeometry, whiteMaterial);
pill2.position.set(10, 10, 10);
pill2.scale.set(1.2, 1.2, 1.2);
// scene.add(pill2);
gsap.fromTo(pill2.position, {
    x: -100
}, {
    x: 100,
    yoyo: true,
    duration: 20,
    repeat: -1,
    easing: 'sine.inOut'
});
gsap.fromTo(pill2.position, {
    y: -100
}, {
    y: 10,
    yoyo: true,
    duration: 20,
    repeat: -1,
    easing: 'sine.inOut'
});
gsap.to(pill2.rotation, {
    x: Math.PI,
    duration: 20,
    ease: "none",
    repeat: -1
})
// gsap.to(pill2.rotation, {x:})


const icosGeometry = new THREE.IcosahedronGeometry(10, 1);
const transpMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: true
});
const icosaheder = new THREE.Mesh(icosGeometry, transpMaterial);
// scene.add(icosaheder);

const torusGeometry = new THREE.TorusGeometry(10, 3, 7, 11);
const torusMaterial = new THREE.MeshPhongMaterial({
    color: 0x0047ff
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
const coreGeometry = new THREE.OctahedronGeometry(5, 2);
const coreMaterial = new THREE.MeshPhongMaterial({
    color: 0x6cff79
});
const core = new THREE.Mesh(coreGeometry);
core.material = coreMaterial;

const torusGroup = new THREE.Group();
torusGroup.add(torus);
torusGroup.add(core);
torusGroup.position.x = 50;
scene.add(torusGroup);


//import
const loader = new GLTFLoader();
var dna;
loader.load('assets/dna/scene.gltf', (gltf) => {
    let dnaMesh = gltf.scene;
    dna = dnaMesh.clone(true);
    console.log(dna.material);
    dna.material = new THREE.MeshNormalMaterial();
    let dna2 = dnaMesh.clone(true);
    dna2.rotation.y = Math.PI / 4;
    dna2.material = new THREE.MeshNormalMaterial();

    scene.add(dna);
    // scene.add(dna2);
});

loader.load('assets/flask/scene.gltf', (gltf) => {
    let mesh = gltf.scene.children[0];
    mesh.scale.set(5, 5, 5);
    console.log(mesh.material);
    scene.add(mesh);
})

loader.load('assets/pill/scene.gltf', (gltf) => {
    let mesh = gltf.scene.children[0];
    // console.log(gltf.scene);
    mesh.scale.set(mesh.scale.x * 1.5, mesh.scale.y* 1.5, mesh.scale.z* 1.5);
    mesh.material = whiteMaterial;
    // console.log(mesh);
    mesh.position.x = 10;
    scene.add(mesh);

})
//start animation
function animateObject(time) {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animateObject);

}
requestAnimationFrame(animateObject);



//controls
const controls = new OrbitControls(camera, canvas);
controls.enablePan = false;
controls.maxPolarAngle = Math.PI;
controls.enableDamping = true;
// controls.enableZoom = false;
controls.dampingFactor = 0.1;

//light
// https://threejsfundamentals.org/threejs/lessons/ru/threejs-lights.html
const color = 0xFFFFFF;
const intensity = 1;
const skyColor = 0xB1E1FF; // light blue
const groundColor = 0xB97A20;
const light = new THREE.PointLight(color, intensity);
light.position.set(0, 50, 50);
// light.target.position.set(0, 0, 0);
scene.add(light);
const helper = new THREE.PointLightHelper(light);
scene.add(helper);

