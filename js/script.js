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
camera.position.set(10, 4, 10);
// const ch = new THREE.CameraHelper(camera);
// scene.add(ch);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});
scene.background = new THREE.Color('black');

//axes
const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper);

//controls
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
// {
//     //тестовый свет
//     const color = 0xffffff;
//     const intensity = 0.8;
//     const light = new THREE.DirectionalLight(color, intensity);
//     light.position.set(10, 10, 10);
//     scene.add(light);
//     light.castShadow = true;
//     light.shadow.bias = -0.0001;
//     light.shadow.mapSize.width = 1024 * 1024
//     light.shadow.mapSize.height = 1024 * 1024
// }
const SHADOW_MAP_SIZE = 1024*1024;
{
    //https://redstapler.co/threejs-realistic-light-shadow-tutorial/
    //https://threejs.org/docs/?q=LightShadow#api/en/lights/shadows/LightShadow
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.SpotLight(color, intensity);
    light.position.set(0, 10, -10);
    scene.add(light);

    light.castShadow = true;
    light.shadow.bias = -0.0001;
    light.shadow.mapSize.width = SHADOW_MAP_SIZE
    light.shadow.mapSize.height = SHADOW_MAP_SIZE
	light.shadowDarkness = 0.5;
	const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
    // scene.add(cameraHelper);
} {
    const color = 0xffffff;
    const intensity = 0.5;
    const light = new THREE.SpotLight(color, intensity);
    light.position.set(0, 5, 0);
    scene.add(light);
	light.shadowDarkness = 0.1;
    light.castShadow = true;
    light.shadow.bias = -0.0001;
    light.shadow.mapSize.width = SHADOW_MAP_SIZE
    light.shadow.mapSize.height = SHADOW_MAP_SIZE
	const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
    // scene.add(cameraHelper);
	// light.shadowDarkness = 0.2;
}
renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
// renderer.shadowMap.type = THREE.BasicShadowMap
// renderer.shadowMap.type = THREE.PCFShadowMap
// renderer.shadowMap.type = THREE.VSMShadowMap


const loader = new GLTFLoader();
loader.load("../assets/model/cupcake.gltf", (gltf) => {
    let desert = gltf.scene;
    desert.traverse((child) => {
        if (child.isMesh) {
            if (child.name.includes('oreo')) {
                // https://threejs.org/docs/#api/en/loaders/TextureLoader
                const textureLoader = new THREE.TextureLoader();
                textureLoader.load(
                    '../assets/model/Oreo.jpg',
                    function (texture) {
                        const material = new THREE
                            .MeshLambertMaterial({
                                map: texture
                            });
                        texture.flipY = false;
                        child.material = material;
                    });
            }
            if (!child.name.includes('Cylinder')) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        }

    })
    scene.add(desert);
    desert.scale.set(3, 3, 3);

    gsap.to(desert.rotation, {
        y: Math.PI*2,
        duration: 20,
        ease: "linear",
        repeat: -1
    })
});

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);
