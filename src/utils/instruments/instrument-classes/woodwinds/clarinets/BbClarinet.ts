import { Instrument } from "../../../superclasses/Instrument";
import { TransposingInstrument } from "../../../superclasses/TransposingInstrument";
import { INSTRUMENTS_IN_SCORE_ORDER } from "../../../constants";
import { Voice, detuneChord } from "../../../../tune/Voice";
import { transposeKey, transposeNotes, transposeDetunings  } from "../../../../key-signatures/transposition/transpositionUtils";

export class BbClarinet extends TransposingInstrument {
    private voiceNames:string[] = [];

    constructor(L:number, scoreKey:string, partLabel:string) {
        const tranposedKey = transposeKey(scoreKey, 1); //transpose up a whole step
        super(
            L, 
            Instrument.appendPartLabel("B♭ Clarinet", partLabel), 
            Instrument.appendPartLabel("B♭ Cl.", partLabel), 
            757,
            tranposedKey,
            scoreKey,
            -2,
            Instrument.getScoreOrder(INSTRUMENTS_IN_SCORE_ORDER.B_FLAT_CLARINET, partLabel), 
            [50, 94], //low E (written) / low D (CP) to C7 (written) / Bb6 (CP)
            [50, 87], //low E (written) / low D (CP) to F6 (written) / Eb6 (CP)
            partLabel
        );
    }

    //adds voice from notes in concert pitch
    addVoice(notes: string, detuneAll:number, detuneChords:detuneChord[]): void {
        const voiceName = "BbClarinet" + (this.partLabel ? this.partLabel : "0") + "V" + this.voices.length;
        this.voiceNames.push(voiceName);
        const transposedNotes = transposeNotes(this.scoreKey, notes, 1);
        //transpose detuned notes too
        const transposedDetuneChords = transposeDetunings(this.scoreKey, detuneChords, 1);
        const v = new Voice(this.L, voiceName, this.MIDINum, this.key, this.transpose, "treble", transposedNotes, detuneAll, transposedDetuneChords, this.name, this.subname);
        this.voices.push(v);
        const concertPitchVoice = new Voice(this.L, voiceName, this.MIDINum, this.scoreKey, 0, "treble", notes, detuneAll, transposedDetuneChords, this.name, this.subname);
        this.concertPitchVoices.push(concertPitchVoice);
    }

    //adds a voice written in the key of B-flat
    // addWrittenVoice(notes: string, detuneAll:number, detuneChords:detuneChord[]) : void {
    //     const voiceName = "BbClarinet" + (this.partLabel ? this.partLabel : "0") + "V" + this.voices.length;
    //     this.voiceNames.push(voiceName);
    //     const v = new Voice(this.L, voiceName, this.MIDINum, this.key, this.transpose, "treble", notes, detuneAll, detuneChords, this.name, this.subname);
    //     this.voices.push(v);
    // }

    get staveOrganization(): string {
        if(!this.voiceNames.length) return "";
        else {
            return "(" + this.voiceNames.join(" ") + ")";
        }
    }
}