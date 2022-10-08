export class Chord {
    public pitches:number[];
    public duration:number;

    constructor(pitches:number[], duration:number) {
        this.pitches = pitches;
        this.duration = duration;
    }
}