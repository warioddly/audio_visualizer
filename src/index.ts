
// @ts-ignore
import * as THREE from 'three';
// @ts-ignore
import { AudioController } from './audio';


class Engine {


    private readonly _scene: THREE.Scene;
    private readonly _camera: THREE.PerspectiveCamera;
    private _renderer: THREE.WebGLRenderer;

    private _cube: THREE.Mesh;


    private _audioController: AudioController;


    constructor() {

        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.01, 100 );
        this._camera.position.z = 5;

        this._renderer = new THREE.WebGLRenderer( { antialias: true } );
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        this._renderer.setAnimationLoop( this._animation.bind(this) );
        this._renderer.setPixelRatio( window.devicePixelRatio );
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this._renderer.domElement );


        this._audioController = new AudioController('./assets/audio/waves.mp3', {
            smoothingTimeConstant: 0.7,
            minDecibels: -120,
            maxDecibels: -50,
        });


        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this._cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this._scene.add(this._cube);


        window.addEventListener( 'resize', this._resize.bind(this) );



    }


    private _animation( time: any ) {

        this._audioController.getByteFrequencyData();

        let dataArray = this._audioController.dataArray;

        const bassArray = dataArray.slice(0, dataArray.length / 4);

        const average = bassArray.reduce((acc, value) => acc + value, 0) / bassArray.length;

        this._cube.scale.x = average / 100;
        this._cube.scale.y = average / 100;




        this._renderer.render( this._scene, this._camera );

    }


    private _resize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize( window.innerWidth, window.innerHeight );
    }


}


new Engine();
