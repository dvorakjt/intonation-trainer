import { Instrument } from "./Instrument";
import { INSTRUMENTS_IN_SCORE_ORDER } from "./constants";
import { Voice, detuneChord } from "../Voice";

export class Flute extends Instrument {
    private voiceNames:string[];

    constructor(L:number, scoreKey:string, partLabel:string) {
        super(
            L, 
            Instrument.appendPartLabel("Flute", partLabel), 
            Instrument.appendPartLabel("Fl.", partLabel), 
            771, 
            scoreKey, 
            0, 
            Instrument.getScoreOrder(INSTRUMENTS_IN_SCORE_ORDER.FLUTE, partLabel), 
            partLabel
        );
        this.voiceNames = [];
    }

    addVoice(notes: string, detuneAll:number, detuneChords:detuneChord[]): void {
        const voiceName = "Flute" + (this.partLabel ? this.partLabel : "0") + "V" + this.voices.length;
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