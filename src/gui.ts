


export default class GUI {

    public playback: any = document.querySelector('#audio-playback');
    public uploader: HTMLBodyElement = document.querySelector('#audio-uploader');
    public preloader: HTMLBodyElement = document.querySelector('#preloader');
    

    constructor() {

        const reader = new FileReader();
        
        this.uploader.addEventListener('change', (event: any) => {

            reader.readAsDataURL(event.target.files[0]);

            reader.onload = () => this.playback.src = reader.result;

        });

    }

}
