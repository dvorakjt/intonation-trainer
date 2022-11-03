import { Instrument } from "../../../superclasses/Instrument";
import { TransposingInstrument } from "../../../superclasses/TransposingInstrument";
import { INSTRUMENTS_IN_SCORE_ORDER } from "../../../constants";
import { Voice, detuneChord } from "../../../../tune/Voice";
import { transposeKey, transposeNotes, transposeDetunings  } from "../../../../key-signatures/transposition/transpositionUtils";

export class AClarinet extends TransposingInstrument {
    private voiceNames:string[] = [];

    constructor(L:number, scoreKey:string, partLabel:string) {
        const tranposedKey = transposeKey(scoreKey, 2); //transpose up a third...?
        super(
            L, 
            Instrument.appendPartLabel("A Clarinet", partLabel), 
            Instrument.appendPartLabel("A Cl.", partLabel), 
            757,
            tranposedKey,
            scoreKey,
            -3, //3 half steps down
            Instrument.getScoreOrder(INSTRUMENTS_IN_SCORE_ORDER.B_FLAT_CLARINET, partLabel), 
            [49, 93], //low E (written) / low C# (CP) to C7 (written) / A6 (CP)
            [49, 86], //low E (written) / low C# (CP) to F6 (written) / D6 (CP)
            partLabel
        );
    }

    //adds voice from notes in concert pitch
    addVoice(notes: string, detuneAll:number, detuneChords:detuneChord[]): void {
        const voiceName = "AClarinet" + (this.partLabel ? this.partLabel : "0") + "V" + this.voices.length;
        this.voiceNames.push(voiceName);
        const transposedNotes = transposeNotes(this.scoreKey, notes, 2);
        //transpose detuned notes too
        const transposedDetuneChords = transposeDetunings(this.scoreKey, detuneChords, 2);
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