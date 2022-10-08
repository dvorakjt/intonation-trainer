import { Chord } from "./Chord";
import { instrumentNameToNumber } from "./instrumentNameToNumber";
import { notationToChords } from "./notationToChords";

export class PlaybackVoice {
    public instrument:number;
    public chords:Chord[];

    constructor(instrumentName:string, key:string, transpose:number, L:number, abcNotation:string) {
        this.instrument = instrumentNameToNumber(instrumentName);
        this.chords = notationToChords(L, key, transpose, abcNotation);
    }
}