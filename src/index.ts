
// @ts-ignore
import * as THREE from 'three';
// @ts-ignore
import { AudioController } from './audio';


class Engine {


    private readonly _scene: THREE.Scene;
    private readonly _camera: THREE.PerspectiveCamera;
    private _renderer: THREE.WebGLRenderer;


    private _audioController: AudioController = new AudioController("./assets/audio/waves.mp3");


    constructor() {

        this._scene = new THREE.Scene();

        this._camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.01, 100 );
        this._camera.position.z = 0.9;

        this._renderer = new THREE.WebGLRenderer( { antialias: true } );
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        this._renderer.setAnimationLoop( this._animation.bind(this) );
        this._renderer.setPixelRatio( window.devicePixelRatio );
        this._renderer.setSize( window.innerWidth, window.innerHeight );

        document.body.appendChild( this._renderer.domElement );

        window.addEventListener( 'resize', this._resize.bind(this) );

    }


    private _animation( time: any ) {

        this._renderer.render( this._scene, this._camera );

    }


    private _resize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize( window.innerWidth, window.innerHeight );
    }


}


new Engine();
