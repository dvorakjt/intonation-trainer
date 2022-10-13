import { Instrument } from "./Instrument";
import { Voice, detuneChord } from "../Voice";

export class Piano extends Instrument {
    private voiceNamesLH:string[];
    private voiceNamesRH:string[];

    constructor(L:number, scoreKey:string, partLabel:string) {
        super(L, Instrument.appendPartLabel("Piano", partLabel), Instrument.appendPartLabel("Pno.", partLabel), 4, scoreKey, 0, Instrument.getScoreOrder(100, partLabel), partLabel);
        this.voiceNamesLH = [];
        this.voiceNamesRH = [];
    }

    addVoice(notes: string, detuneAll: number, detuneChords: detuneChord[], stave?:number): void {
        const voiceName = "Piano-" + (this.partLabel ? this.partLabel : "0") + "-" + this.voices.length;
        let clef;
        if(stave === 0) {
            clef = "treble";
            this.voiceNamesLH.push(voiceName);
        }
        else {
            clef = "bass";
            this.voiceNamesRH.push(voiceName);
        }
        let v;
        if(!this.voices) v = new Voice(this.L, voiceName, this.MIDINum, this.key, this.transpose, clef, notes, detuneAll, detuneChords, this.name, this.subname);
        else v = new Voice(this.L, voiceName, this.MIDINum, this.key, this.transpose, clef, notes, detuneAll, detuneChords);
        this.voices.push(v);
    }

    addVoiceLH(notes: string, detuneAll: number, detuneChords: detuneChord[]) {
        this.addVoice(notes, detuneAll, detuneChords, 0);
    }

    addVoiceRH(notes: string, detuneAll: number, detuneChords: detuneChord[]) {
        this.addVoice(notes, detuneAll, detuneChords, 1);
    }

    get staveOrganization(): string {
        const lhVoices = "(" + this.voiceNamesLH.join(" ") + ")";
        const rhVoices = "(" + this.voiceNamesRH.join(" ") + ")";
        console.log("{" + lhVoices + " " + rhVoices + "}")
        return "{" + lhVoices + " " + rhVoices + "}";
    }
}