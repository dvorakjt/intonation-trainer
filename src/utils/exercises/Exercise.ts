import { Tune } from "../tune/Tune"

export class Exercise {
    public tune:Tune;
    public correctAnswer:any;

    constructor (M:string, L:string, K:string, bpm:number, correctAnswer:any) {
        this.tune = new Tune(M, L, K, bpm);
        this.correctAnswer = correctAnswer;
    }
}