// import {SphereGeometry} from '../three.js';
export class CelestialBody {
   static G = 0.001;

   constructor(name, mass, position, velocity, mesh) {
      this.name = name;
      this.mass = mass;
      this.position = position;
      this.velocity = velocity;
      this.mesh = mesh;
      this.move();
   }

   static mesh(color) {
      return new THREE.Mesh(
         new THREE.SphereGeometry(.1, 16),
         new THREE.MeshStandardMaterial({color})
      );
   }

   move() {
      this.mesh.position.set(this.position.x, this.position.y, this.position.z);

   }

   update(others) {
         const gForces = others
            .filter((other) => other.name !== this.name)
            .map((other) => {
               // r = distance between the two positions (scalar)
               const r = this.position.clone().distanceTo(other.position);
   
               // normalize the subtraction of the positions to get the angular vector between them (vector)
               const v0 = this.position.clone().sub(other.position).normalize().negate();
   
               // F = (G * m1 * m2) / r^2
               let F = (CelestialBody.G * this.mass * other.mass) / Math.pow(r, 2);
                if(r <= .1) this.velocity = new Vector3();
               return v0.clone().multiplyScalar(F);
            });
   
         for (const force of gForces) {
            const acceleration = force.clone().divideScalar(this.mass);
            console.log('position', this.position)
            console.log('velocity', this.ve)
   
            this.velocity.add(acceleration);
            this.position.add(this.velocity);
         }
      this.move();
   }
}
