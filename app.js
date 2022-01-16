import {CelestialBody} from './modules/CelestialBody.js';
export function main() {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    const sunMesh = CelestialBody.mesh(0x00fff0);
    scene.add(sunMesh);
    const sun = new CelestialBody(
        'sun', 100, new THREE.Vector3(0,0,0), new THREE.Vector3(0, 0, 0), sunMesh
    );

    const planetMesh = CelestialBody.mesh(0x00ff00);
    scene.add(planetMesh);
    const planet = new CelestialBody(
        'planet', 1, new THREE.Vector3(3,0,0), new THREE.Vector3(0, 0, .2), planetMesh
    );

    const bodies = [sun, planet];
    
    const light = new THREE.PointLight({color: 0xfffff});
    light.position.set(-2, 2, 3);
    scene.add(light);

    const ambient = new THREE.AmbientLight({color: 0xffffff});
    ambient.intensity = .2;
    scene.add(ambient);
    
    camera.position.z = 5;
    
    function animate() {
        requestAnimationFrame(animate);
        bodies.forEach(body => body.update(bodies));
        renderer.render(scene, camera);
    };
    
    animate();
}