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
const camera = new THREE.PerspectiveCamera(15, width / height, 10, 2000);
camera.position.set(0, 0, 50);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
scene.background = new THREE.Color(0xffffff);

//light
{
    const color = 0xf6b315;
    const intensity = 1;
    const light = new THREE.PointLight(color, intensity);
    light.position.set(5, 5, 10);
    scene.add(light);
}
{
    const color = 0xff0000;
    const intensity = 1;
    const light = new THREE.PointLight(color, intensity);
    light.position.set(-5, -5, 10);
    scene.add(light);
}
{
    const color = 0x00ff00;
    const intensity = 1;
    const light = new THREE.PointLight(color, intensity);
    light.position.set(5, -5, 5);
    scene.add(light);
}
{
    const color = 0x000000;
    const intensity = 2;
    const light = new THREE.PointLight(color, intensity);
    light.position.set(0, 0, 5);
    scene.add(light);
}

const loader = new GLTFLoader();
loader.load("../assets/model/soup.gltf", (gltf) => {
    let soup = gltf.scene.children[0];
    scene.add(soup);
    soup.rotation.y = Math.PI / 6;
    soup.rotation.x = Math.PI / 10;
});

loader.load("../assets/model/potato.gltf", (gltf) => {
    let potato = gltf.scene.children[0];
    scene.add(potato);
    potato.rotation.y = -Math.PI / 3;
    potato.rotation.x = Math.PI / 5;
    potato.position.set(-3, 2, 0);
});

loader.load("../assets/model/pizza_round.gltf", (gltf) => {
    let potato = gltf.scene.children[0];
    // gltf.scene.traverse(function (child) {
    //     child.material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    // });
    scene.add(potato);
    potato.material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    potato.position.set(3, 2, 0);
});

loader.load("../assets/model/chicken.gltf", (gltf) => {
    let chicken = gltf.scene.children[0];
    scene.add(chicken);
    chicken.scale.set(2, 2, 2);
    chicken.position.set(4, -2, 0);
});

loader.load("../assets/model/burger.gltf", (gltf) => {
    let burger = gltf.scene.children[0];
    scene.add(burger);
    burger.position.set(-3, -2, 0);
});

loader.load("../assets/model/combo.gltf", (gltf) => {
    let potato = gltf.scene.children[0];
    scene.add(potato);
    potato.position.set(5, 0, 0);
});

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);

const raycaster = new THREE.Raycaster(); // create once
const mouse = new THREE.Vector2(); // create once

window.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersect = raycaster.intersectObjects(scene.children, false);
    if (intersect.length > 0) {
        const target = intersect[0].object;
        if (!target.userData?.busy) {
            gsap.from(target.rotation, {
                y: Math.PI / 30,
                x: Math.PI / 30,
                ease: "elastic.out(1.5, 0.4)",
                duration: 1.5,
                onStart: function () {
                    target.userData.busy = true;
                },
                onComplete: function () {
                    target.userData.busy = false;
                },
            });
        } else console.log(target);
    }

    renderer.render(scene, camera);
});
