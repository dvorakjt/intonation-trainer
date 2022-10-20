import { detuneChord, Voice } from "../../tune/Voice";

export abstract class Instrument {
    public L:number;
    public name:string;
    public subname:string;
    public MIDINum:number;
    public key:string;
    public isTransposing:boolean;
    public transpose:number;
    public scoreOrder:number;
    public concertPitchRange:number[];
    public comfortableCPRange:number[];
    public partLabel:string; //ex clarinet 1, 2
    public voices:Voice[] = [];
    
    constructor(L:number, name:string, subname:string, MIDINum:number, key:string, isTransposing:boolean, transpose:number, scoreOrder:number, concertPitchRange:number[], comfortableCPRange:number[], partLabel:string) {
        this.L=L;
        this.name=name;
        this.subname=subname;
        this.MIDINum=MIDINum;
        this.key=key;
        this.isTransposing = isTransposing;
        this.transpose=transpose;
        this.scoreOrder=scoreOrder;
        this.concertPitchRange = concertPitchRange;
        this.comfortableCPRange = comfortableCPRange;
        this.partLabel=partLabel;
    }

    get voicesString() {
        return this.voices.map(v => v.toString()).join("\n");
    }

    get inTunePlaybackData() {
        return this.voices.map(v => v.toPlaybackVoice());
    }

    get detunedPlaybackData() {
        return this.voices.map(v => v.toDetunedPlaybackVoice());
    }
    
    abstract addVoice(notes:string, detuneAll:number, detuneChords:detuneChord[]) : void;

    abstract get staveOrganization() : string;

    static appendPartLabel(name:string, partLabel:string) {
        if(partLabel) {
            if(partLabel === "Solo") return `${partLabel} ${name}`;
            else return `${name} ${partLabel}`;
        } else return name;
    }

    static getScoreOrder(scoreOrder:number, partLabel:string) {
        if(partLabel === "Solo") return -1 + 0.01 * scoreOrder; //solo instruments come first, in score order
        else if(!isNaN(Number(partLabel))){
            return scoreOrder + 0.01 * Number(partLabel);
        } else return scoreOrder;
    }
}