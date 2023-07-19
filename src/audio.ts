
// @ts-ignore
import wavesAudio from './assets/audio/waves.mp3';


export class AudioController {

    public audio: HTMLAudioElement;

    constructor(path: string) {

        const audioContext: AudioContext = new AudioContext();
        const audioElement: HTMLAudioElement = new Audio(path);
        const source: MediaElementAudioSourceNode = audioContext.createMediaElementSource(audioElement);

        source.connect(audioContext.destination);

        window.addEventListener('click', () => {

            console.log("play");

            console.log(audioElement);

            audioElement.play();

        });


    }


}
