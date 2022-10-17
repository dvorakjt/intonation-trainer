import { Instrument } from "./Instrument";
import { INSTRUMENTS_IN_SCORE_ORDER } from "./constants";
import { Voice, detuneChord } from "../Voice";
import { transposeKey, transposeNotes  } from "../key-signatures/transposition/transpositionUtils";

export class BbClarinet extends Instrument {
    private scoreKey:string;
    private voiceNames:string[];

    constructor(L:number, scoreKey:string, partLabel:string) {
        const tranposedKey = transposeKey(scoreKey, 1); //transpose up a whole step
        super(
            L, 
            Instrument.appendPartLabel("B♭ Clarinet", partLabel), 
            Instrument.appendPartLabel("B♭ Cl.", partLabel), 
            757, 
            tranposedKey, 
            -2, 
            Instrument.getScoreOrder(INSTRUMENTS_IN_SCORE_ORDER.B_FLAT_CLARINET, partLabel), 
            partLabel
        );
        this.voiceNames = [];
        this.scoreKey = scoreKey;
    }

    //adds voice from notes in concert pitch
    addVoice(notes: string, detuneAll:number, detuneChords:detuneChord[]): void {
        const voiceName = "BbClarinet" + (this.partLabel ? this.partLabel : "0") + "V" + this.voices.length;
        this.voiceNames.push(voiceName);
        const transposedNotes = transposeNotes(this.scoreKey, notes, 1);
        const v = new Voice(this.L, voiceName, this.MIDINum, this.key, this.transpose, "treble", transposedNotes, detuneAll, detuneChords, this.name, this.subname);
        this.voices.push(v);
    }

    //adds a voice written in the key of B-flat
    addWrittenVoice(notes: string, detuneAll:number, detuneChords:detuneChord[]) : void {
        const voiceName = "BbClarinet" + (this.partLabel ? this.partLabel : "0") + "V" + this.voices.length;
        this.voiceNames.push(voiceName);
        const v = new Voice(this.L, voiceName, this.MIDINum, this.key, this.transpose, "treble", notes, detuneAll, detuneChords, this.name, this.subname);
        this.voices.push(v);
    }

    get staveOrganization(): string {
        if(!this.voiceNames.length) return "";
        else {
            return "(" + this.voiceNames.join(" ") + ")";
        }
    }
}