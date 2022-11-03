import { Instrument } from "../../../superclasses/Instrument";
import { TransposingInstrument } from "../../../superclasses/TransposingInstrument";
import { INSTRUMENTS_IN_SCORE_ORDER } from "../../../constants";
import { Voice, detuneChord } from "../../../../tune/Voice";
import { transposeKey, transposeNotes, transposeDetunings  } from "../../../../key-signatures/transposition/transpositionUtils";

export class BassClarinet extends TransposingInstrument {
    private voiceNames:string[] = [];

    constructor(L:number, scoreKey:string, partLabel:string) {
        const tranposedKey = transposeKey(scoreKey, 8); //transpose up a 9th
        super(
            L, 
            Instrument.appendPartLabel("Bass Clarinet", partLabel), 
            Instrument.appendPartLabel("B. Cl.", partLabel), 
            757,
            tranposedKey,
            scoreKey,
            -14, //a 9th, 14 half steps
            Instrument.getScoreOrder(INSTRUMENTS_IN_SCORE_ORDER.BASS_CLARINET, partLabel), 
            [50, 94], //low E (written) / low D (CP) to C7 (written) / Bb6 (CP)
            [50, 87], //low E (written) / low D (CP) to F6 (written) / Eb6 (CP)
            partLabel
        );
    }

    //adds voice from notes in concert pitch
    addVoice(notes: string, detuneAll:number, detuneChords:detuneChord[]): void {
        const voiceName = "BassClarinet" + (this.partLabel ? this.partLabel : "0") + "V" + this.voices.length;
        this.voiceNames.push(voiceName);
        const transposedNotes = transposeNotes(this.scoreKey, notes, 8);
        //transpose detuned notes too
        const transposedDetuneChords = transposeDetunings(this.scoreKey, detuneChords, 8);
        const v = new Voice(this.L, voiceName, this.MIDINum, this.key, this.transpose, "treble", transposedNotes, detuneAll, transposedDetuneChords, this.name, this.subname);
        this.voices.push(v);
        const concertPitchVoice = new Voice(this.L, voiceName, this.MIDINum, this.scoreKey, 0, "bass", notes, detuneAll, transposedDetuneChords, this.name, this.subname);
        this.concertPitchVoices.push(concertPitchVoice);
    }

    get staveOrganization(): string {
        if(!this.voiceNames.length) return "";
        else {
            return "(" + this.voiceNames.join(" ") + ")";
        }
    }
}