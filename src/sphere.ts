
// @ts-ignore
import * as THREE from 'three';
import Noise3D from './noise';
import Utils from './utils';


export class Sphere {

    public readonly geometry: THREE.SpherBufferGeometry;
    public readonly mesh: THREE.Mesh;


    private _noise3D: Noise3D = new Noise3D();
    private _utils: any = new Utils();
    

    private _options: any = {
        radius: 3,
        detail: 10,
        color: 0x00ff00,
        wireframe: true,
        amplitude: 15,
        roughness: 0.00001,
        position: { x: 0, y: 0, z: 0 },
        rotateAnimation: true,
        rotateAmplitude: 0.001,
    }


    constructor (options?: any) {

        const { radius, detail, color, wireframe }: any = this._options = { ...this._options, ...options };

        const icosahedronGeometry = new THREE.IcosahedronGeometry(radius, detail);
        const lambertMaterial = new THREE.MeshLambertMaterial({ color: color, wireframe: wireframe });
    
        this.mesh = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
        this.mesh.position.set(0, 0, 0);

        this.geometry = this.mesh.geometry;

    }



    public animate (dataArray: Uint8Array, time?: number ) {

        
        const lowerHalfArray = dataArray.slice(0, (dataArray.length/2) - 1);
        const upperHalfArray = dataArray.slice((dataArray.length / 2 ) - 1, dataArray.length - 1);
    
        var lowerMaxFr = this._utils.max(lowerHalfArray) / lowerHalfArray.length;
        var upperAvgFr = this._utils.avg(upperHalfArray) / upperHalfArray.length;
    

        this._transform(
            this._utils.modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8), 
            this._utils.modulate(upperAvgFr, 0, 1, 0, 4),
            time,
        );


        if (this._options.rotateAnimation) {
            const amplitude = this._options.rotateAmplitude;
            this.mesh.rotation.x += amplitude;
            this.mesh.rotation.y += amplitude;
            this.mesh.rotation.z += amplitude;
        }
    
    }



    private _transform( bassFr: number, treFr: number, time?: number,) {
        

        const vertex = new THREE.Vector3();
        const { amplitude, roughness, radius }: any = this._options;
        const position = this.mesh.geometry.attributes.position;
        const _time = time ?? window.performance.now();


        for(let i = 0; i < position.count; i++){

            vertex.fromBufferAttribute(position, i);
            vertex.normalize();
            
            const distance = (radius + bassFr ) + this._noise3D.noise(
                vertex.x + _time * roughness * 7,
                vertex.y + _time * roughness * 8, 
                vertex.z + _time * roughness * 9 
            ) * amplitude * treFr;
            
            vertex.multiplyScalar(distance);
            position.setXYZ(i, vertex.x, vertex.y, vertex.z);

        }
        
        this.mesh.geometry.attributes.position.needsUpdate = true;

    }
  


}
