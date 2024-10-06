const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10).normalize();
scene.add(light);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true; 

const textureLoader = new THREE.TextureLoader();
const planetTexture = textureLoader.load('assets/planet_texture.jpg');

const planetGeometry = new THREE.SphereGeometry(1, 32, 32);
const planetMaterial = new THREE.MeshBasicMaterial({ map: planetTexture });
const planet = new THREE.Mesh(planetGeometry, planetMaterial);
planet.name = "Proxima Centauri b";  
scene.add(planet);

camera.position.z = 5;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function displayPlanetData(planet) {
  const planetInfo = document.getElementById('planet-info');
  planetInfo.style.display = 'block';
  planetInfo.innerHTML = `
    <h3>${planet.name}</h3>
    <p>Mass: 1.27 Earth masses</p>
    <p>Distance: 4.24 light years</p>
    <p>Description: Closest known exoplanet to the Solar System.</p>
  `;
}

function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  
  if (intersects.length > 0) {
    displayPlanetData(intersects[0].object);
  }
}
window.addEventListener('click', onMouseClick);

function animate() {
  requestAnimationFrame(animate);
  controls.update();  
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
