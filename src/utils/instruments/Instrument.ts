import { detuneChord, Voice } from "../Voice";

export abstract class Instrument {
    public L:number;
    public name:string;
    public subname:string;
    public MIDINum:number;
    public key:string;
    public transpose:number;
    public scoreOrder:number;
    public partLabel:string; //ex clarinet 1, 2
    public voices:Voice[];

    constructor(L:number, name:string, subname:string, MIDINum:number, key:string, transpose:number, scoreOrder:number, partLabel:string) {
        this.L=L;
        this.name=name;
        this.subname=subname;
        this.MIDINum=MIDINum;
        this.key=key;
        this.transpose=transpose;
        this.scoreOrder=scoreOrder;
        this.partLabel=partLabel;
        this.voices=[];
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