


export default class GUI {

    public playback: any = document.querySelector('#audio-playback');
    public uploader: HTMLBodyElement = document.querySelector('#audio-uploader');

    constructor(callback: any) {

        const reader = new FileReader();
        
        this.uploader.addEventListener('change', (event: any) => {

            reader.readAsDataURL(event.target.files[0]);

            callback(URL.createObjectURL(event.target.files[0]));

        });

    }


}
