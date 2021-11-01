import * as THREE from "./three.module.js";
import {
	GLTFLoader
} from "./GLTFLoader.js";
import {
	OrbitControls
} from "./OrbitControls.js";

const canvas = document.querySelector("canvas");
const height = window.innerHeight;
const width = window.innerWidth;
canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

//обязательные объекты
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(15, width / height, 10, 2000);
camera.position.set(10, 4, 10);

const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true,
	alpha: true
});

scene.background = new THREE.Color('black');
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;



//axes
const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper);


const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.update();


const lightPosition1 = [0, 5, 0];
const lightPosition2 = [0, 10, -10];
const color = 0xffffff;
const intensity = 0.5;
[lightPosition1, lightPosition2].forEach((position) => {
	const light = new THREE.SpotLight(color, intensity);
	light.position.set(...position);
	console.log(scene);
	scene.add(light);

	light.castShadow = true;
	const SHADOW_MAP_SIZE = 512 * 1024;
	light.shadow.mapSize.width = SHADOW_MAP_SIZE;
	light.shadow.mapSize.height = SHADOW_MAP_SIZE;
	light.shadow.bias = -0.0001;
})


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
});

function render() {
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(render);

}
requestAnimationFrame(render);
