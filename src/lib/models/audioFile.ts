
export class AudioFile {
    file: File;// this is for upload only.
    audioFileName:string;
    audioFileDuration: number = 0;

    constructor(file: File, audioFileName: string, displayedFileName: string, uploadStatus: number) {
        this.file = file;
        this.audioFileName = audioFileName;
    }
}