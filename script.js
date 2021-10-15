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
light.position.set(0, 10, 10);
scene.add(light);

const loader = new GLTFLoader();
loader.load("assets/panda.gltf", (gltf) => {
    let panda = gltf.scene;
    panda.rotation.x = Math.PI / 2;
    panda.rotation.y = Math.PI;
    // scene.add(panda);
});

loader.load("assets/burger.gltf", (gltf) => {
    let burger = gltf.scene.children[0];
    burger.position.set(3, 2, 0);
    scene.add(burger);

    burger.userData.draggable = true;
    burger.userData.name = "burger";

});

loader.load("assets/flower.gltf", (gltf) => {
    let flower = gltf.scene;
    flower.scale.set(0.1, 0.1, 0.1);
    flower.position.set(-3, 2, 0);
    scene.add(flower);
    // console.log(gltf);

    flower.userData.draggable = true;
    flower.userData.name = "flower";
});

loader.load("assets/sun.gltf", (gltf) => {
    let sun = gltf.scene.children[0];
    sun.scale.set(0.1, 0.1, 0.1);
    sun.position.set(3, -2, 0);
    scene.add(sun);

    sun.userData.draggable = true;
    sun.userData.name = "sun";
});

loader.load("assets/ice.gltf", (gltf) => {
    let ice = gltf.scene.children[0];
    ice.position.set(-3, -2, 0);
    ice.scale.set(0.5, 0.5, 0.5);
    // scene.add(ice);
    ice.userData.draggable = true;
    ice.userData.name = "ice";
});

loader.load("assets/ice2.gltf", (gltf) => {
    let ice = gltf.scene.children[0];
    ice.scale.set(0.8, 0.8, 0.8);
    scene.add(ice);

    ice.userData.draggable = true;
    ice.userData.name = "ice";
});

loader.load("assets/leaf_in.gltf", (gltf) => {
    const leaf = new THREE.Group();
    // console.log(gltf);
    // leaf.add(gltf.scene.children[0]);
    // leaf.add(gltf.scene.children[1]);
    scene.add(gltf.scene.children[1]);
    leaf.scale.set(2,2,2)
    leaf.position.set(-6, -2, 0);

    // leaf.rotation.z = Math.PI / 4;

    leaf.userData.draggable = true;
    leaf.userData.name = "leaf";

    // const vector = new THREE.Vector3( 0, 1, 1 );
    // leaf.setRotationFromAxisAngle(vector.normalize(), 1);
});

loader.load("assets/duck.gltf", (gltf) => {
    let duck = gltf.scene;
    duck.scale.set(10, 10, 10);
    duck.position.set(-3, 2, 0);
    // scene.add(duck);
});

function render() {
    // controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);

const raycaster = new THREE.Raycaster(); // create once
const clickMouse = new THREE.Vector2(); // create once
const moveMouse = new THREE.Vector2(); // create once
let draggable = THREE.Object3D;

window.addEventListener("mousemove", (event) => {
    clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(clickMouse, camera);
    const found = raycaster.intersectObjects(scene.children);
    // console.log(found);
    if (found.length > 0 && found[0].object.userData.draggable) {
        draggable = found[0].object;
        // console.log(`found draggable ${draggable.userData.name}`);
        const point = found[0].point;
        const direction = point.sub(draggable.position);
        console.log(direction);
        // const angle = point.angleTo(draggable.position);
        const angle = Math.PI / 3;
        // console.log(draggable.position.angleTo(found[0].point));
        // console.log(direction.normalize())
        // draggable.setRotationFromAxisAngle(point.normalize(), Math.PI / 30);
        draggable.rotation.x = direction.x * angle;
        draggable.rotation.y = direction.y * angle;
        draggable.rotation.z = direction.z * angle;
    }

    renderer.render(scene, camera);
});


window.addEventListener("mousemove", (event) => {
    moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});
