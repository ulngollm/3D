const canvas = document.querySelector('canvas');
const height = window.innerHeight;
const width = window.innerWidth;
canvas.setAttribute('width', window.innerWidth);
canvas.setAttribute('height', window.innerHeight);

//обязательные объекты
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 20, 2000);
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
    color: 0x3e1d00,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
sphere.visible = false;

const cubeGeometry = new THREE.TorusKnotGeometry(80, 30, 50, 15,4);

const cube = new THREE.Mesh(cubeGeometry, material);
scene.add(cube);
cube.rotation.set(0, 45, 90);


function animateObject(time){
    // console.log(time);
    cube.rotation.x = cube.rotation.x + 0.002;
    cube.rotation.y = cube.rotation.y + 0.003;

    renderer.render(scene, camera);
    requestAnimationFrame(animateObject);
}
requestAnimationFrame(animateObject);

