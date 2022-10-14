import { Instrument } from "./Instrument";
import { Voice, detuneChord } from "../Voice";

export class Flute extends Instrument {
    private voiceNames:string[];

    constructor(L:number, scoreKey:string, partLabel:string) {
        super(L, Instrument.appendPartLabel("Flute", partLabel), Instrument.appendPartLabel("Fl.", partLabel), 771, scoreKey, 0, Instrument.getScoreOrder(1, partLabel), partLabel);
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

//const flute1 = Tune.addInstrument(instruments.FLUTE, 1) <--return a reference to that instrument
//flute1.addVoice("notes");
//tune.toString --> for each instrument, instrument.staveOrganization, also get all the voices of the instrument
//there may be other methods I want