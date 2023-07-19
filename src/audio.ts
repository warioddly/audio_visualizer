


const FFT_SIZE: number = 2048;

export class AudioController {
    public readonly audioElement: HTMLAudioElement;
    public readonly analyser: AnalyserNode;

    private readonly bufferLength: number;
    private readonly dataArray: Uint8Array;

    constructor(path: string) {
        const audioContext: AudioContext = new AudioContext();

        this.analyser = audioContext.createAnalyser();
        this.analyser.fftSize = FFT_SIZE;

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


        this.audioElement.addEventListener('play', () => {
            this._getAudioData();
        });

    }

    private _getAudioData = () => {
        this.analyser.getByteFrequencyData(this.dataArray);

        for (let i = 0; i < this.bufferLength; i++) {
            if (this.dataArray[i] !== 0) console.log(`Frequency bin ${i}: ${this.dataArray[i]}`);
        }

        setTimeout(() => {
            this._getAudioData();
        }, 1000 / (this.analyser.context.sampleRate / this.analyser.fftSize));

    };
}
