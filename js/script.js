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

//interact
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener('mousemove', onMouseMove, false);


//create objects
function createBall(size, color) {
    const geometry = new THREE.IcosahedronGeometry(size, 1);
    const material = new THREE.MeshPhongMaterial(color);
    return new THREE.Mesh(geometry, material);
}

function createBottleInner() {
    const bottle = new THREE.Group();
    const colors = [0xff002d, 0x0000ff];
    colors.forEach((color, index) => {
        let ball = createBall(1, {
            color: color
        });
        ball.position.set(2*index, 0, 2*index);
        gsap.to(ball.position, {
            y: 6,
            yoyo: true,
            duration: 1.5,
            delay: "random(0,1, 0.25)",
            repeat: -1
        })
        bottle.add(ball);
    })
    return bottle;
}

//import
const loader = new GLTFLoader();
loader.load('assets/dna_upd/scene.gltf', (gltf) => {
    let dna = gltf.scene.children[0];
    dna.rotation.y = Math.PI / 4;
    dna.position.set(20, 1, 0);
    scene.add(dna);
    gsap.to(dna.rotation, {
        z: Math.PI * 2,
        repeat: -1,
        duration: 5,
        ease: "none"
    })
});
loader.load('assets/flask/scene.gltf', (gltf) => {
    let flask = gltf.scene.children[0];
    flask.scale.set(5, 5, 5);
    console.log(flask.material);
    let bottle = createBottleInner();
    bottle.add(flask);
    scene.add(bottle);
    gsap.to(bottle.rotation, {
        y: Math.PI * 2,
        repeat: -1,
        duration: 5,
        yoyo: false,
        ease: "none"
    })
})

loader.load('assets/pill/scene.gltf', (gltf) => {
    let pill = gltf.scene.children[0];
    pill.scale.set(pill.scale.x * 1.5, pill.scale.y * 1.5, pill.scale.z * 1.5);
    pill.material = new THREE.MeshPhongMaterial({
        color: 0xffffff
    });
    scene.add(pill);
    gsap.fromTo(pill.position, {
        x: -70
    }, {
        x: 70,
        duration: 40,
        yoyo: true,
        repeat: -1
    });
    gsap.fromTo(pill.position, {
        y: -20
    }, {
        y: 20,
        duration: 40,
        yoyo: true,
        repeat: -1
    });
    gsap.to(pill.rotation, {
        y: Math.PI * 2,
        z: Math.PI * 2,
        duration: 20,
        repeat: -1
    });

})
//start animation
function render() {
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);
    for(let elem of intersects){
        gsap.to(elem.object.position, {y:0.0001, duration:0.2, yoyo:true, repeat:1})
        console.log(elem);
    }

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);

}
requestAnimationFrame(render);





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