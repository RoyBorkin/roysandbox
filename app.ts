import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSG } from 'three-csg-ts';

let camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer;

init();
animate();

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  const controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(0, 20, 10);
  controls.update();

  // Create the base shape (a hexagonal cylinder)
  const hexagonGeometry = new THREE.CylinderGeometry(5, 5, 10, 6);
  const hexagonMaterial = new THREE.MeshNormalMaterial();
  const hexagonMesh = new THREE.Mesh(hexagonGeometry, hexagonMaterial);

  // Create a hole (a smaller cylinder) to subtract from the hexagonal cylinder
  const holeGeometry = new THREE.CylinderGeometry(2, 2, 10, 6);
  const holeMaterial = new THREE.MeshNormalMaterial();
  const holeMesh = new THREE.Mesh(holeGeometry, holeMaterial);

  // Update matrices before performing CSG operations
  hexagonMesh.updateMatrix();
  holeMesh.updateMatrix();

  // Perform subtraction operation to create a hexagonal shape with a hole in the middle
  const result = CSG.subtract(hexagonMesh, holeMesh);

  // Add the result to the scene
  scene.add(result);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
