import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
import gsap from "https://unpkg.com/gsap@3.7.1/gsap-core.js";

const canvas = document.querySelector("canvas");
const height = window.innerHeight;
const width = window.innerWidth;
canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

//обязательные объекты
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(15, width / height, 10, 4000);
camera.position.set(10, 0, 50);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
scene.background = new THREE.Color(0xffffff);

const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper);

const controls = new OrbitControls(camera, canvas);
// controls.enablePan = false;
controls.target.set(0, 0, 0);
// controls.maxPolarAngle = Math.PI;
// controls.enableDamping = true;
// controls.dampingFactor = 0.1;
//light
{
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.PointLight(color, intensity);
    light.position.set(-10, 20, 20);
    scene.add(light);
}
// {
//     const color = 0xff0000;
//     const intensity = 1;
//     const light = new THREE.PointLight(color, intensity);
//     light.position.set(-5, -5, 10);
//     // scene.add(light);
// }
// {
//     const color = 0x00ff00;
//     const intensity = 1;
//     const light = new THREE.PointLight(color, intensity);
//     light.position.set(5, -5, 5);
//     // scene.add(light);
// }
// {
//     const color = 0x000000;
//     const intensity = 2;
//     const light = new THREE.PointLight(color, intensity);
//     light.position.set(0, 0, 5);
//     scene.add(light);
// }

const loader = new GLTFLoader();
// loader.load("../assets/model/hotdog.gltf", (gltf) => {
//     const textureLoader = new THREE.TextureLoader();
//     const hotdogTexture = textureLoader.load(
//         "../assets/model/G06_Hotdog_Albedo.png"
//     );
//     hotdogTexture.flipY = false;
//     gltf.scene.traverse(function (o) {
//         if (o.isMesh) {
//             o.material.map = hotdogTexture;
//         }
//     });
//     let hotdog = gltf.scene.children[0];
//     hotdog.position.set(1,0,5);
//     console.log(hotdog);
//     scene.add(hotdog);
// });

loader.load("../assets/model/low/apple.gltf", (gltf) => {
    let apple = gltf.scene.children[0];
    scene.add(apple);
    apple.position.set(-7, 0, 0);
});

loader.load("../assets/model/low/red_apple.gltf", (gltf) => {
    let apple = gltf.scene.children[0];
    scene.add(apple);
    apple.position.set(-3, 4, 0);
});

loader.load("../assets/model/low/orange.gltf", (gltf) => {
    let orange = gltf.scene.children[0];
    scene.add(orange);
    orange.position.set(5, 2, 0);
});

loader.load("../assets/model/low/cherry.gltf", (gltf) => {
    let cherry = gltf.scene.children[0];
    scene.add(cherry);
    cherry.position.set(3, -2, 0);
    cherry.rotation.z = Math.PI / 8 ;
});

loader.load("../assets/model/low/banana.gltf", (gltf) => {
    let banana = gltf.scene.children[0];
    scene.add(banana);
    banana.position.set(0, 0,0);
    banana.rotation.y = - Math.PI / 6 ;
});

loader.load("../assets/model/low/pineapple.gltf", (gltf) => {
    let pineapple = gltf.scene.children[0];
    scene.add(pineapple);
    pineapple.position.set(-2, -4, 0);
});

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);

// {
//     const raycaster = new THREE.Raycaster(); // create once
//     const mouse = new THREE.Vector2(); // create once

//     window.addEventListener("mousemove", (event) => {
//         mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//         mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//         raycaster.setFromCamera(mouse, camera);
//         const intersect = raycaster.intersectObjects(scene.children, false);
//         if (intersect.length > 0) {
//             const target = intersect[0].object;
//             if (!target.userData?.busy) {
//                 gsap.from(target.rotation, {
//                     y: Math.PI / 60,
//                     x: Math.PI / 60,
//                     ease: "elastic.out(1.5, 0.4)",
//                     duration: 1.5,
//                     onStart: function () {
//                         target.userData.busy = true;
//                     },
//                     onComplete: function () {
//                         target.userData.busy = false;
//                     },
//                 });
//             } else console.log(target);
//         }

//         renderer.render(scene, camera);
//     });
// }
