const canvas = document.querySelector('canvas');
const height = window.innerHeight;
const width = window.innerWidth;
canvas.setAttribute('width', window.innerWidth);
canvas.setAttribute('height', window.innerHeight);

//обязательные объекты
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, width / height, 20, 2000);
camera.position.set(0, 0, 500);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

//light
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

//объекты сцены
let geometry = new THREE.SphereGeometry(150, 30, 9);
let material = new THREE.MeshPhongMaterial({
    color: 0xffff00,
    // wireframe: true,
    // side: THREE.DoubleSide
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);


renderer.render(scene, camera);


