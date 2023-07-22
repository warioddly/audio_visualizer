
// @ts-ignore
import * as THREE from 'three';
// @ts-ignore
import { AudioController } from './audio';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


class Engine {


    private readonly _scene: THREE.Scene;
    private readonly _camera: THREE.PerspectiveCamera;
    private readonly orbitControls: OrbitControls;
    private readonly _renderer: THREE.WebGLRenderer;
    private readonly _light: THREE.DirectionalLight;

    private _cube: THREE.Mesh;
    private sphere: THREE.SphereGeometry;

    private readonly _audioController: AudioController;


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

        this.orbitControls = new OrbitControls( this._camera, this._renderer.domElement );
        this.orbitControls.enableDamping = true;
        this.orbitControls.dampingFactor = 0.05;
        this.orbitControls.screenSpacePanning = false;
        this.orbitControls.maxDistance = 500;

        this._light = new THREE.DirectionalLight( 0xffffff, 1 );
        this._light.position.set( 1, 1, 1 ).normalize();
        this._scene.add( this._light );
        


        this._audioController = new AudioController('./assets/audio/waves.mp3', {
            smoothingTimeConstant: 0.7,
            minDecibels: -120,
            maxDecibels: -50,
            loop: true,
            autoplay: true,
        });


        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this._cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        // this._scene.add(this._cube);


        const geometry = new THREE.SphereGeometry( 1, 32, 32 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); 
        this.sphere = new THREE.Mesh( geometry, material );

        this.sphere.position.x = 0;
        this.sphere.position.y = 0;
        this.sphere.position.z = 0;
        
        this._scene.add( this.sphere );

        window.addEventListener( 'resize', this._resize.bind(this) );

    }


    private _animation( time: any ) {

    //    this._cubeAnimation();

       this.orbitControls.update();

       this._renderer.render( this._scene, this._camera );

    }


    private _cubeAnimation() {

        this._audioController.getByteFrequencyData();

        let dataArray = this._audioController.dataArray;

        const bassArray = dataArray.slice(0, dataArray.length / 4);
        const average = bassArray.reduce((acc, value) => acc + value, 0) / bassArray.length;

        

        if (average < 100) {
            this._cube.scale.x = 1;
            this._cube.scale.y = 1;
        }
        else {
            this._cube.scale.x = average / 100;
            this._cube.scale.y = average / 100;
        }

    }


    private _resize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize( window.innerWidth, window.innerHeight );
    }


}


new Engine();
