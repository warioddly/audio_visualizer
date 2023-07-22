
// @ts-ignore
import * as THREE from 'three';


export class Sphere {

    public readonly geometry: THREE.BufferGeometry;
    public readonly buffer: THREE.BufferGeometry;
    public readonly mesh: THREE.Mesh;
    

    private _options: any = {
        radius: 5,
        widthSegments: 32,
        heightSegments: 32,
        color: 0x00ff00,
        wireframe: true,
        position: { x: 0, y: 0, z: 0 },
    }


    constructor (options?: any) {

        // this._options = { ...this._options, ...options };

        this.geometry = new THREE.SphereGeometry( 3, 50, 50);

        this.mesh = new THREE.Mesh( this.geometry, new THREE.MeshBasicMaterial( { wireframe: true } ) );

        // this.buffer = new THREE.BufferGeometry().setFromObject(this.mesh);

    }



}
