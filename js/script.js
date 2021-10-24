import * as THREE from "./three.module.js";
import {
    OrbitControls
} from "./OrbitControls.js";
import {
    GLTFLoader
} from "./GLTFLoader.js";
import gsap from "./gsap-core.js";

const canvas = document.querySelector("canvas");
const height = window.innerHeight;
const width = window.innerWidth;
canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

//обязательные объекты
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(15, width / height, 10, 2000);
camera.position.set(10, 10, 10);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});

const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper);

const controls = new OrbitControls(camera, canvas);
// controls.enablePan = false;
controls.target.set(0, 0, 0);
// controls.maxPolarAngle = Math.PI / 6;
controls.maxAzimuthAngle = Math.PI / 2;
controls.minAzimuthAngle = Math.PI / 2;
// controls.enableDamping = true;
// controls.dampingFactor = 0.1;
controls.update();
//light
{
    const color = 0xffffff;
    const intensity = 0.5;
    const light = new THREE.PointLight(color, intensity);
    light.position.set(0, 6, 10);
    scene.add(light);
    //https://redstapler.co/threejs-realistic-light-shadow-tutorial/
    //https://threejs.org/docs/?q=LightShadow#api/en/lights/shadows/LightShadow
    light.castShadow = true;
    light.shadow.bias = -0.0001;
    light.shadow.mapSize.width = 1024 * 1024
    light.shadow.mapSize.height = 1024 * 1024
}
{
    {
        const color = 0xffffff;
        const intensity = 0.5;
        const light = new THREE.PointLight(color, intensity);
        light.position.set(10, 6, 10);
        scene.add(light);

        light.castShadow = true;
        light.shadow.bias = -0.00015;
        light.shadow.mapSize.width = 1024 * 1024
        light.shadow.mapSize.height = 1024 * 1024
    }
}
{
    {
        const color = 0xffffff;
        const intensity = 0.5;
        const light = new THREE.PointLight(color, intensity);
        light.position.set(0, 20, 0);
        scene.add(light);

        light.castShadow = true;
        light.shadow.bias = -0.00015;
        light.shadow.mapSize.width = 1024 * 1024
        light.shadow.mapSize.height = 1024 * 1024
    }
}
renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.shadowMap.type = THREE.BasicShadowMap
// renderer.shadowMap.type = THREE.PCFShadowMap
// renderer.shadowMap.type = THREE.VSMShadowMap


const loader = new GLTFLoader();
loader.load("../assets/model/cupcake2.gltf", (gltf) => {
    let desert = gltf.scene;
    desert.traverse((child) => {
        if (child.isMesh) {
            if (child.name.includes('oreo')) {
                // https://threejs.org/docs/#api/en/loaders/TextureLoader
                const textureLoader = new THREE.TextureLoader();
                textureLoader.load(
                    '../assets/model/src/Oreo.png',
                    function (texture) {
                        const material = new THREE
                            .MeshPhongMaterial({
                                map: texture
                            });
                        texture.flipY = false;
                        child.material = material;
                    });
            }
            child.receiveShadow = true;
        }
        child.castShadow = true;
        child.receiveShadow = true;
        // child.material.map.anisotropy = 16;
    })
    scene.add(desert);
    desert.scale.set(3, 3, 3);
    desert.rotation.y = Math.PI;

    // gsap.to(desert.rotation, {
    //     y: Math.PI,
    //     duration: 10,
    //     ease: "linear",
    //     repeat: -1
    // })
});

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);
