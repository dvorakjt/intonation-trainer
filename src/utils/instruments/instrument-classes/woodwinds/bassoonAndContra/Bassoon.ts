import { Instrument } from "../../../superclasses/Instrument";
import { NonTransposingInstrument } from "../../../superclasses/NonTransposingInstrument";
import { INSTRUMENTS_IN_SCORE_ORDER } from "../../../constants";
import { Voice, detuneChord } from "../../../../tune/Voice";

export class Bassoon extends NonTransposingInstrument {
    private voiceNames:string[];

    constructor(L:number, scoreKey:string, partLabel:string) {
        super(
            L, 
            Instrument.appendPartLabel("Bassoon", partLabel), 
            Instrument.appendPartLabel("Bsn.", partLabel), 
            749, 
            scoreKey,
            Instrument.getScoreOrder(INSTRUMENTS_IN_SCORE_ORDER.BASSOON, partLabel),
            [33, 79], //A1 to G5
            [34, 74], //Bb1 to D5
            partLabel
        );
        this.voiceNames = [];
    }

    addVoice(notes: string, detuneAll:number, detuneChords:detuneChord[]): void {
        const voiceName = "Bassoon" + (this.partLabel ? this.partLabel : "0") + "V" + this.voices.length;
        this.voiceNames.push(voiceName);
        const v = new Voice(this.L, voiceName, this.MIDINum, this.key, this.transpose, "bass", notes, detuneAll, detuneChords, this.name, this.subname);
        this.voices.push(v);
    }

    get staveOrganization(): string {
        if(!this.voiceNames.length) return "";
        else {
            return "(" + this.voiceNames.join(" ") + ")";
        }
    }
}