
// @ts-ignore
import * as THREE from 'three';
// @ts-ignore
import { AudioController } from './audio';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// @ts-ignore
import waves from './assets/audio/waves.mp3';
// @ts-ignore
import space from './assets/images/space.jpg';
import { Sphere } from './sphere';


class Engine {


    private readonly _scene: THREE.Scene;
    private readonly _camera: THREE.PerspectiveCamera;
    private readonly orbitControls: OrbitControls;
    private readonly _renderer: THREE.WebGLRenderer;
    private readonly _light: THREE.DirectionalLight;
    private readonly _audioController: AudioController;

    private sphere: Sphere = new Sphere();

    constructor() {

        waves;
        space;

        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.01, 100 );
        this._camera.position.z = 5;


        this._renderer = new THREE.WebGLRenderer( { antialias: true } );
        this._renderer.setAnimationLoop( this._animation.bind(this) );
        this._renderer.setPixelRatio( window.devicePixelRatio );
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this._renderer.domElement );

        this.orbitControls = new OrbitControls( this._camera, this._renderer.domElement );
        this.orbitControls.enableDamping = true;
        this.orbitControls.dampingFactor = 0.05;
        this.orbitControls.screenSpacePanning = false;
        this.orbitControls.maxDistance = 10;
        this.orbitControls.minDistance = 4;

        this._light = new THREE.DirectionalLight( 0xffffff, 0.5 );
        this._light.position.set( 0, 0, 1 );
        this._scene.add( this._light );

    
        // let bgTexture = new THREE.TextureLoader().load("./assets/images/space.jpg");
        // this._scene.background = bgTexture;

      
        this._audioController = new AudioController('./assets/audio/waves.mp3', {
            loop: true,
            autoplay: true,
            enableKeyboardControls: true,
        });


        // создать сферу через buffer geometry

        this.sphere = new Sphere();

        this._scene.add(this.sphere.mesh);


        window.addEventListener( 'resize', this._resize.bind(this) );

    }


    private _animation( time: any ) {

       this._sphereAnimation();

       this.orbitControls.update();

       this._renderer.render( this._scene, this._camera );

    }


    private _sphereAnimation() {

        let dataArray = this._audioController.analyser.getFrequencyData();

        const bassArray = dataArray.slice(0, dataArray.length / 4);
        const average = bassArray.reduce((acc: number, value: number) => acc + value, 0) / bassArray.length;

        if (average < 100) {
            this.sphere.mesh.scale.x = 1;
            this.sphere.mesh.scale.y = 1;
            this.sphere.mesh.scale.z = 1;
        }
        else {
            this.sphere.mesh.scale.x = average / 300;
            this.sphere.mesh.scale.y = average / 300;
            this.sphere.mesh.scale.z = average / 300;
        }

        this.sphere.mesh.rotation.x += 0.01;
        this.sphere.mesh.rotation.y += 0.01;

    }


    private _resize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize( window.innerWidth, window.innerHeight );
    }


}


new Engine();
