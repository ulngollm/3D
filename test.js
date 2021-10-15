import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { SVGLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/SVGLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";


const canvas = document.querySelector("canvas");
const height = window.innerHeight;
const width = window.innerWidth;
canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

//обязательные объекты
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 10, 4000);
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
const intensity = 0.5;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(0, 10, 10);
scene.add(light);


{
    const material = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
    const cylinderGeometry = new THREE.CylinderGeometry( 5, 5, 5, 32 );
    const cylinder = new THREE.Mesh(cylinderGeometry,material);
    const coneGeometry = new THREE.ConeGeometry( 5, 10, 32 );
    const cone = new THREE.Mesh(coneGeometry,material);
    cone.position.set(0,7.5,0);

    const group = new THREE.Group();
    group.add(cone);
    group.add(cylinder);
    scene.add( group );
    group.userData.name = 'name1';
}

{
    const material = new THREE.MeshPhongMaterial( {color: 0xff00ff} );
    const cylinderGeometry = new THREE.CylinderGeometry( 5, 5, 5, 32 );
    const cylinder = new THREE.Mesh(cylinderGeometry,material);

    const sphereGeometry = new THREE.SphereGeometry( 5, 5,5,0,Math.PI );
    const sphere = new THREE.Mesh( sphereGeometry, material );
    sphere.rotation.x = -Math.PI/2;
    sphere.position.set(0,2,0);

    const group = new THREE.Group();
    group.add(cylinder);
    group.add(sphere);
    scene.add(group);
    group.position.set(20,2,0);
    group.userData.name = 'name2';
}


const raycaster = new THREE.Raycaster(); // create once
const clickMouse = new THREE.Vector2(); // create once
let draggable = THREE.Object3D;

window.addEventListener("mousemove", (event) => {
    clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(clickMouse, camera);
    const found = raycaster.intersectObjects(scene.children);
    if (found.length > 0) {
        // console.
        draggable = found[0].object;
        // console.log(`found draggable ${draggable.userData.name}`);
        console.log(draggable);

    }

    renderer.render(scene, camera);
});

function render() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);


