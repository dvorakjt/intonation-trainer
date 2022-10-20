import { PlaybackVoice } from "./PlaybackVoice";

export class PlaybackData {
    public voices:PlaybackVoice[];
    public wholeNoteDuration:number;
    public instruments:Set<number>;

    constructor(noteValue:number, bpm:number) {
        /*
            example:
            quarter=76
            wholeNoteDuration = ((inverse of 1/4 => 4) * 60 seconds) / beats per minute
        */
        this.wholeNoteDuration = ((1/noteValue) * 60) / bpm;
        this.voices = [];
        this.instruments = new Set<number>();
    }

    addVoice(v:PlaybackVoice) {
        this.instruments.add(v.instrument);
        this.voices.push(v);
    }
}