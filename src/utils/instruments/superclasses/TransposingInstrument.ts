import { Instrument } from "./Instrument";
import { Voice } from "../../tune/Voice";

export abstract class TransposingInstrument extends Instrument {
    public scoreKey:string;
    public concertPitchVoices:Voice[] = [];

    constructor(L:number, name:string, subname:string, MIDINum:number, key:string, scoreKey:string, transpose:number, scoreOrder:number, concertPitchRange:number[], comfortableCPRange:number[], partLabel:string) {
        super(L, name, subname, MIDINum, key, true, transpose, scoreOrder, concertPitchRange, comfortableCPRange, partLabel);
        this.scoreKey = scoreKey;
    }

    get concertPitchVoicesString() {
        return this.concertPitchVoices.map(v => v.toString()).join("\n");
    }
}