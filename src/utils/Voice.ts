import { PlaybackVoice } from "./PlaybackVoice";

export type detuneChord = {
    chordIndex:number;
    detunePitches:detunePitch[];
}

type detunePitch = {
    pitch:string;
    detuneBy:number;
}

export class Voice {
    private L:number;
    private voiceName:string;
    private MIDINum:number;
    private key:string;
    private transpose:number;
    private clef:string;
    private notes:string;
    private detuneAll:number;
    private detuneChords:detuneChord[];
    private displayName?:string;
    private subname?:string;

    constructor(L:number, voiceName:string, MIDINum:number, key:string, transpose:number, clef:string, notes:string, detuneAll:number, detuneChords:detuneChord[], displayName?:string, subname?:string) {
        this.L = L;
        this.voiceName = voiceName;
        this.MIDINum = MIDINum;
        this.key = key;
        this.transpose = transpose;
        this.clef = clef;
        this.notes = notes;
        this.detuneAll = detuneAll;
        this.detuneChords = detuneChords;
        if(displayName) this.displayName = displayName;
        if(subname) this.subname = subname;
    }

    toString() {
        return `V:${this.voiceName} clef=${this.clef} transpose=${this.transpose}${this.displayName ? ` name="${this.displayName}"` : ""}${this.subname ? ` subname="${this.subname}"` : ""}\n[K:${this.key}]${this.notes}`;
    }

    toPlaybackVoice() {
        return new PlaybackVoice(this.MIDINum, this.key, this.transpose, this.L, this.notes);
    }

    toDetunedPlaybackVoice() {
        if(this.detuneAll !== 0) return PlaybackVoice.completelyDetunedVoice(this.MIDINum, this.key, this.transpose, this.L, this.notes, this.detuneAll);
        else if(this.detuneChords.length) return PlaybackVoice.partiallyDetunedVoice(this.MIDINum, this.key, this.transpose, this.L, this.notes, this.detuneChords);
        else return new PlaybackVoice(this.MIDINum, this.key, this.transpose, this.L, this.notes);
    }
}