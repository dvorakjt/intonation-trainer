import { Chord } from "./Chord";
import { detuneChord } from "../Voice";
import { notationToChords, noteToMidiNumber } from "./notationToChords";

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

    static partiallyDetunedVoice(MIDINum:number, key:string, transpose:number, L:number, abcNotation:string, detuneChords:detuneChord[]) {
        const v = new PlaybackVoice(MIDINum, key, transpose, L, abcNotation);
        detuneChords.forEach(chordDetuning => {
            const chordToDetune = v.chords[chordDetuning.chordIndex];
            chordDetuning.detunePitches.forEach(pitchDetuning => {
                console.log("doing stuff");
                console.log(pitchDetuning.pitch);
                console.log(key);
                console.log(transpose);
                console.log(noteToMidiNumber(pitchDetuning.pitch, key, transpose));
                let pitchIndex = chordToDetune.pitches.findIndex(a => a === noteToMidiNumber(pitchDetuning.pitch, key, transpose));
                if(pitchIndex >= 0) chordToDetune.pitches[pitchIndex] += pitchDetuning.detuneBy;
            });
        });
        return v;
    }
}