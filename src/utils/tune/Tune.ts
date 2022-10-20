import { evalFraction } from "../generic/evalFraction";
import { PlaybackData } from "./playback/PlaybackData";
import { Instrument } from "../instruments/superclasses/Instrument";
import { Flute } from "../instruments/instrument-classes/woodwinds/Flute";
import { Piano } from "../instruments/instrument-classes/keyboards/Piano";
import { INSTRUMENTS_IN_SCORE_ORDER } from "../instruments/constants";
import { BbClarinet } from "../instruments/instrument-classes/woodwinds/BbClarinet";
import { TransposingInstrument } from "../instruments/superclasses/TransposingInstrument";

export class Tune {
    M:string;
    L:string;
    K:string;
    instruments:Instrument[];
    tempo: {
        noteValue: number,
        bpm: number
    }

    constructor(M:string, L:string, K:string, bpm:number) {
        this.M = M;
        this.L = L;
        this.K = K;
        this.instruments = [];
        this.tempo = {
            noteValue: evalFraction(L),
            bpm: bpm
        }
    }

    addInstrument(instrument:number, partLabel:string) : Instrument {
        let i;
        switch(instrument) {
            case INSTRUMENTS_IN_SCORE_ORDER.FLUTE :
                i = new Flute(this.tempo.noteValue, this.K, partLabel);
                break;
            case INSTRUMENTS_IN_SCORE_ORDER.PIANO :
                i = new Piano(this.tempo.noteValue, this.K, partLabel);
                break;
            case INSTRUMENTS_IN_SCORE_ORDER.B_FLAT_CLARINET :
                i = new BbClarinet(this.tempo.noteValue, this.K, partLabel);
                break;
            default :
                i = new Flute(this.tempo.noteValue, this.K, partLabel);
        }
        this.instruments.push(i);
        return i;
    }

    toABC() {
        return (
`X: 1
M: ${this.M}
L: ${this.L}
K:
%%staves ${this.staves}
${this.voicesString}
`
);
    }

    toCPABC() {
        return (
`X: 1
M: ${this.M}
L: ${this.L}
K:
%%staves ${this.staves}
${this.concertPitchVoicesString}
`       
        );
    }

    toMIDIInTune() {
        let playbackData = new PlaybackData(evalFraction(this.L), this.tempo.bpm);
        //sort the instruments so the order they are added to playback data matches the order they are added to score
        this.instruments.sort((a, b) => a.scoreOrder - b.scoreOrder);
        for(let instrument of this.instruments) {
            for(let voice of instrument.inTunePlaybackData) playbackData.addVoice(voice);
        }
        return playbackData;
    }

    toMIDIDetuned() {
        let playbackData = new PlaybackData(evalFraction(this.L), this.tempo.bpm);
        this.instruments.sort((a, b) => a.scoreOrder - b.scoreOrder);
        for(let instrument of this.instruments) {
            for(let voice of instrument.detunedPlaybackData) playbackData.addVoice(voice);
        }
        return playbackData;
    }

    private get staves() {
        return this.instruments.map(i => {
            return {
                staves: i.staveOrganization,
                scoreOrder: i.scoreOrder
            }
        }).sort((a, b) => a.scoreOrder - b.scoreOrder).map(s => s.staves).join(" ");
    }

    private get voicesString() {
        return this.instruments.map(i => {
            return i.voicesString;
        }).join("\n")
    }

    private get concertPitchVoicesString() {
        return this.instruments.map(i => {
            if(i.isTransposing) {
                return (i as TransposingInstrument).concertPitchVoicesString;
            } else return i.voicesString;
        }).join("\n");
    }
}