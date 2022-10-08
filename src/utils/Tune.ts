import { Voice } from "./Voice";
import { PlaybackData } from "./PlaybackData";

export default class Tune {
    M:string;
    L:string;
    staves:string;
    K:string;
    voices:Voice[];
    tempo: {
        noteValue: number,
        bpm: number
    }

    constructor(M:string, L:string, staves:string, K:string, noteValue:number, bpm:number) {
        this.M = M;
        this.L = L;
        this.staves = staves;
        this.K = K;
        this.voices = [];
        this.tempo = {
            noteValue: noteValue,
            bpm: bpm
        }
    }

    addVoice(name:string, key:string, transpose:number, clef:string, notes:string) {
        const v = new Voice(eval(this.L), name, key, transpose, clef, notes);
        this.voices.push(v);
    }

    toABC() {
        return (
`X: 1
M: ${this.M}
L: ${this.L}
K:
%%%%staves ${this.staves}
K: ${this.K}
${this.voices.map(v => {
    return v.toString();
}).join("\n")}
`
);
    }

    toMIDI() {
        const playbackData = new PlaybackData(this.tempo.noteValue, this.tempo.bpm);
        for(let v of this.voices) {
            playbackData.addVoice(v.toPlaybackVoice());
        }
        return playbackData;
    }
}