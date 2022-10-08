import { PlaybackVoice } from "./PlaybackVoice";

export class Voice {
    private L:number;
    private name:string;
    private key:string;
    private transpose:number;
    private clef:string;
    private notes:string;

    constructor(L:number, name:string, key:string, transpose:number, clef:string, notes:string) {
        this.L = L;
        this.name = name;
        this.key = key;
        this.transpose = transpose;
        this.clef = clef;
        this.notes = notes;
    }

    toString() {
        return `V:${this.name} [K:${this.key} transpose=${this.transpose} clef=${this.clef}]\n${this.notes}`;
    }

    toPlaybackVoice() {
        return new PlaybackVoice(this.name, this.key, this.transpose, this.L, this.notes);
    }
}