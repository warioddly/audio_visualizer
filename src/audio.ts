
// @ts-ignore
import waves from './assets/audio/waves.mp3'


export class AudioController {

    public readonly audioElement: HTMLAudioElement;
    public readonly analyser: AnalyserNode;
    public readonly dataArray: Uint8Array;
    private readonly bufferLength: number;

    private _options: any = {
        fftSize: 2048,
        smoothingTimeConstant: 0.8,
        minDecibels: -90,
        maxDecibels: -10,
    }

    constructor(path: string, options?: any) {
        waves;

        const audioContext: AudioContext = new AudioContext();
        this.analyser = audioContext.createAnalyser();


        this.analyser.fftSize = options.fftSize || this._options.fftSize;
        this.analyser.smoothingTimeConstant = options.smoothingTimeConstant || this._options.smoothingTimeConstant;
        this.analyser.minDecibels = options.minDecibels || this._options.minDecibels;
        this.analyser.maxDecibels = options.maxDecibels || this._options.maxDecibels;


        this.audioElement = new Audio(path);
        const source: MediaElementAudioSourceNode = audioContext.createMediaElementSource(this.audioElement);

        this.analyser.connect(audioContext.destination);
        source.connect(this.analyser);

        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);

        window.addEventListener('click', () => {
            if (this.audioElement.paused) {
                this.audioElement.play();
                console.log("Playing");
            } else {
                this.audioElement.pause();
                console.log("Paused");
            }
        });

    }

    public getByteFrequencyData(): Uint8Array {
        this.analyser.getByteFrequencyData(this.dataArray);
        return this.dataArray;
    }


}
