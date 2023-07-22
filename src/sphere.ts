
// @ts-ignore
import * as THREE from 'three';


export class Sphere {

    public readonly geometry: THREE.SpherBufferGeometry;
    public readonly mesh: THREE.Mesh;

    public readonly _originalPositions: any;
    
    private _options: any = {
        radius: 3,
        widthSegments: 32,
        heightSegments: 32,
        color: 0x00ff00,
        wireframe: true,
        position: { x: 0, y: 0, z: 0 },
    }


    constructor (options?: any) {

        const { radius, widthSegments, heightSegments }: any = { ...this._options, ...options };

        this.geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments);

        this.mesh = new THREE.Mesh( this.geometry, new THREE.MeshBasicMaterial( { wireframe: true } ) );

        this._originalPositions = [ ...this.mesh.geometry.attributes.position.array ];

    }


    public setToOriginalGeometry() {
        this.mesh.geometry.attributes.position.copyArray(this._originalPositions);
        this.needsUpdate();
    }


    public needsUpdate() {
        this.mesh.geometry.attributes.position.needsUpdate = true;
    }



}
