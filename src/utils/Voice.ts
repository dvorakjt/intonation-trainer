import { PlaybackVoice } from "./PlaybackVoice";

export class Voice {
    private L:number;
    private voiceName:string;
    private key:string;
    private transpose:number;
    private clef:string;
    private notes:string;
    private displayName?:string;

    constructor(L:number, voiceName:string, key:string, transpose:number, clef:string, notes:string, displayName?:string) {
        this.L = L;
        this.voiceName = voiceName;
        this.key = key;
        this.transpose = transpose;
        this.clef = clef;
        this.notes = notes;
        if(displayName) this.displayName = displayName;
    }

    toString() {
        return `V:${this.voiceName} clef=${this.clef} transpose=${this.transpose} ${this.displayName && `name="${this.displayName}"`}\n[K:${this.key}]${this.notes}`;
    }

    toPlaybackVoice() {
        return new PlaybackVoice(this.voiceName, this.key, this.transpose, this.L, this.notes);
    }
}