
// @ts-ignore
import waves from './assets/audio/waves.mp3'
// @ts-ignore
import * as THREE from 'three';


export class AudioController {

    public readonly audioElement: HTMLAudioElement;
    public readonly analyser: AnalyserNode;
    public readonly dataArray: Uint8Array;
    private readonly bufferLength: number;
    private readonly _audioContext: AudioContext;

    private _options: any = {
        fftSize: 2048,
        smoothingTimeConstant: 0.8,
        minDecibels: -90,
        maxDecibels: -10,
        loop: false,
        autoplay: false,
        enableKeyboardControls: true,
        windTimeConstant: 1,
    }


    constructor(path: string, options?: any) {

        waves;

        this.audioElement = new Audio(path);
        this.audioElement.loop  = options.loop || this._options.loop;
        this.audioElement.autoplay = options.autoplay || this._options.autoplay;

        this._audioContext = new AudioContext();
        const source: MediaElementAudioSourceNode = this._audioContext.createMediaElementSource(this.audioElement);

        this.analyser = this._audioContext.createAnalyser();
        this.analyser.fftSize = options.fftSize || this._options.fftSize;
        this.analyser.smoothingTimeConstant = options.smoothingTimeConstant || this._options.smoothingTimeConstant;
        this.analyser.minDecibels = options.minDecibels || this._options.minDecibels;
        this.analyser.maxDecibels = options.maxDecibels || this._options.maxDecibels;

        source.connect(this.analyser);
        this.analyser.connect(this._audioContext.destination);
        
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);

        console.log("enableKeyboardControls", options.enableKeyboardControls)

        if (options.enableKeyboardControls ?? this._options.enableKeyboardControls) {
            this._addKeyboardControls();
        }

    }


    public getByteFrequencyData(): Uint8Array {
        this.analyser.getByteFrequencyData(this.dataArray);
        return this.dataArray;
    }


    public playOrPause(): void {
        if (this.audioElement.paused) {
            this.audioElement.play();
            console.log("Playing");
        } else {
            this.audioElement.pause();
            console.log("Paused");
        }
    }


    private _addKeyboardControls(): void {

        window.addEventListener('keydown', (event) => {

            if (event.key === ' ') {
                this.playOrPause();
            }

            if (event.key === 'ArrowRight') {
                this.audioElement.currentTime += this._options.windTimeConstant;
            }

            if (event.key === 'ArrowLeft') {
                this.audioElement.currentTime -= this._options.windTimeConstant;
            }

        });

    }


}
