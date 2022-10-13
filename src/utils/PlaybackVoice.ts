import { Chord } from "./Chord";
import { instrumentNameToNumber } from "./instrumentNameToNumber";
import { notationToChords } from "./notationToChords";

export class PlaybackVoice {
    public instrument:number;
    public chords:Chord[];

    constructor(MIDINum:number, key:string, transpose:number, L:number, abcNotation:string) {
        this.instrument = MIDINum;
        this.chords = notationToChords(L, key, transpose, abcNotation);
    }

    static completelyDetunedVoice(MIDINum:number, key:string, transpose:number, L:number, abcNotation:string, detuneBy:number) {
        const v = new PlaybackVoice(MIDINum, key, transpose, L, abcNotation);
        v.chords.forEach(c => {
            c.pitches = c.pitches.map(p => p + detuneBy);
        });
        return v;
    }
}