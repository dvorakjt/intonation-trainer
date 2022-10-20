import { Instrument } from "./Instrument";

export abstract class NonTransposingInstrument extends Instrument {

    constructor(L:number, name:string, subname:string, MIDINum:number, key:string, scoreOrder:number, concertPitchRange:number[], comfortableCPRange:number[], partLabel:string) {
        super(L, name, subname, MIDINum, key, false, 0, scoreOrder, concertPitchRange, comfortableCPRange, partLabel);
    }
}