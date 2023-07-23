
// @ts-ignore
import * as THREE from 'three';


export class AudioController {

    public readonly sound: THREE.Audio;
    public readonly listener: THREE.AudioListener;
    public readonly analyser: THREE.AudioAnalyser;


    private _options: any = {
        loop: false,
        autoplay: false,
        enableKeyboardControls: true,
        windTimeConstant: 0.1,
        fftSize: 2048
    }


    constructor(path: string, options?: any) {
        
        this._options = { ...this._options, ...options };

        this.listener = new THREE.AudioListener();
        this.sound = new THREE.Audio( this.listener );

        this.analyser = new THREE.AudioAnalyser( this.sound, this._options.fftSize ); 

        const that = this;

        new THREE.AudioLoader().load(path, function( buffer: any) {

            that.sound.setBuffer( buffer );
            that.sound.setLoop( that._options.loop );
            that.sound.setVolume( 1 );

            if (that._options.autoplay) {
                that.sound.play();
            }
            
        });

        if (this._options.enableKeyboardControls) {
            this._addKeyboardControls();
        }

    }


    public playOrPause(): void {
        if (this.sound.isPlaying) {
            this.sound.pause();
            console.log('pause');
        }
        else {
            this.sound.play();
            console.log('play');
        }
    }


    private _addKeyboardControls(): void {


        window.addEventListener('keydown', (event) => {

            if (event.key === ' ') {
                this.playOrPause();
            }

            if (event.key === 'ArrowRight') {
                this.sound.setPlaybackRate(this.sound.playbackRate + this._options.windTimeConstant);
            }

            if (event.key === 'ArrowLeft') {
                this.sound.setPlaybackRate(this.sound.playbackRate - this._options.windTimeConstant);
            }

            if (event.key === 'ArrowUp' && this.sound.getVolume() < 0.9) {
                this.sound.setVolume(this.sound.getVolume() + 0.1);
            }

            if (event.key === 'ArrowDown' && this.sound.getVolume() > 0.1) {
                this.sound.setVolume(this.sound.getVolume() - 0.1);
            }


        });


        window.addEventListener('keyup', (event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                this.sound.setPlaybackRate(1);
            }
        });
        

    }


}
