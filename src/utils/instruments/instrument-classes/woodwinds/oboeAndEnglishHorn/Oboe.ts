import { Instrument } from "../../../superclasses/Instrument";
import { NonTransposingInstrument } from "../../../superclasses/NonTransposingInstrument";
import { INSTRUMENTS_IN_SCORE_ORDER } from "../../../constants";
import { Voice, detuneChord } from "../../../../tune/Voice";

export class Oboe extends NonTransposingInstrument {
    private voiceNames:string[];

    constructor(L:number, scoreKey:string, partLabel:string) {
        super(
            L, 
            Instrument.appendPartLabel("Oboe", partLabel), 
            Instrument.appendPartLabel("Ob.", partLabel), 
            731, 
            scoreKey,
            Instrument.getScoreOrder(INSTRUMENTS_IN_SCORE_ORDER.OBOE, partLabel),
            [58, 91], //low Bb to G6
            [60, 87], //low C to Eb6
            partLabel
        );
        this.voiceNames = [];
    }

    addVoice(notes: string, detuneAll:number, detuneChords:detuneChord[]): void {
        const voiceName = "Oboe" + (this.partLabel ? this.partLabel : "0") + "V" + this.voices.length;
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