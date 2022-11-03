import { Instrument } from "../../../superclasses/Instrument";
import { TransposingInstrument } from "../../../superclasses/TransposingInstrument";
import { INSTRUMENTS_IN_SCORE_ORDER } from "../../../constants";
import { Voice, detuneChord } from "../../../../tune/Voice";
import { transposeKey, transposeNotes, transposeDetunings  } from "../../../../key-signatures/transposition/transpositionUtils";

export class EnglishHorn extends TransposingInstrument {
    private voiceNames:string[] = [];

    constructor(L:number, scoreKey:string, partLabel:string) {
        const tranposedKey = transposeKey(scoreKey, 4); //transpose key sig up a 5th
        super(
            L, 
            Instrument.appendPartLabel("English Horn", partLabel), 
            Instrument.appendPartLabel("E. Hn.", partLabel), 
            739,
            tranposedKey,
            scoreKey,
            -7, //7 half steps down
            Instrument.getScoreOrder(INSTRUMENTS_IN_SCORE_ORDER.ENGLISH_HORN, partLabel), 
            [52, 84], //E3 to C6
            [52, 84], //E3 to C6
            partLabel
        );
    }

    //adds voice from notes in concert pitch
    addVoice(notes: string, detuneAll:number, detuneChords:detuneChord[]): void {
        const voiceName = "EnglishHorn" + (this.partLabel ? this.partLabel : "0") + "V" + this.voices.length;
        this.voiceNames.push(voiceName);
        const transposedNotes = transposeNotes(this.scoreKey, notes, 4);
        //transpose detuned notes too
        const transposedDetuneChords = transposeDetunings(this.scoreKey, detuneChords, 4);
        const v = new Voice(this.L, voiceName, this.MIDINum, this.key, this.transpose, "treble", transposedNotes, detuneAll, transposedDetuneChords, this.name, this.subname);
        this.voices.push(v);
        const concertPitchVoice = new Voice(this.L, voiceName, this.MIDINum, this.scoreKey, 0, "treble", notes, detuneAll, transposedDetuneChords, this.name, this.subname);
        this.concertPitchVoices.push(concertPitchVoice);
    }

    get staveOrganization(): string {
        if(!this.voiceNames.length) return "";
        else {
            return "(" + this.voiceNames.join(" ") + ")";
        }
    }
}