
// @ts-ignore
import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AudioController } from './audio';
import { Sphere } from './sphere';
import Utils from './utils'


class Engine {

    private readonly _scene: THREE.Scene;
    private readonly _camera: THREE.PerspectiveCamera;
    private readonly _orbitControls: OrbitControls;
    private readonly _renderer: THREE.WebGLRenderer;
    private readonly _light: THREE.DirectionalLight;
    private readonly _audioController: AudioController;

    private readonly sphere: Sphere;
    private readonly utils: Utils = new Utils();


    constructor() {

        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.01, 100 );
        this._camera.position.z = 15;


        this._renderer = new THREE.WebGLRenderer( { antialias: true } );
        this._renderer.setAnimationLoop( this._animation.bind(this) );
        this._renderer.setPixelRatio( window.devicePixelRatio );
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this._renderer.domElement );


        this._orbitControls = new OrbitControls( this._camera, this._renderer.domElement );
        this._orbitControls.enableDamping = true;
        this._orbitControls.dampingFactor = 0.05;
        this._orbitControls.screenSpacePanning = false;
        this._orbitControls.maxDistance = 18;
        this._orbitControls.minDistance = 7;


        this._light = new THREE.DirectionalLight( 0xffffff, 0.5 );
        this._light.position.set( 0, 0, 1 );
        this._scene.add( this._light );

        const ambientLight = new THREE.AmbientLight(0xaaaaaa);
        this._scene.add(ambientLight);

        this.sphere = new Sphere();
        this._scene.add(this.sphere.mesh);
      
        this._audioController = new AudioController('./assets/audio/waves.mp3', {
            loop: true,
            autoplay: false,
            enableKeyboardControls: true,
        });


        window.addEventListener( 'resize', this._resize.bind(this) );


        console.log("%cEngine is initialized", "color: white; font-weight: bold; background-color: green; padding: 2px; border-radius: 3px;");

    }


    private _animation( time: any ) {

       this.sphere.animate(new Uint8Array(this._audioController.analyser.getFrequencyData()), time);

       this._orbitControls.update();

       this._renderer.render( this._scene, this._camera );

    }



    private _resize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize( window.innerWidth, window.innerHeight );
    }

}


new Engine();
