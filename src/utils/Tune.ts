import { evalFraction } from "./generic/evalFraction";
import { PlaybackData } from "./PlaybackData";
import { Instrument } from "./instruments/Instrument";
import { Flute } from "./instruments/Flute";
import { Piano } from "./instruments/Piano";
import { INSTRUMENTS_IN_SCORE_ORDER } from "./instruments/constants";
import { BbClarinet } from "./instruments/BbClarinet";

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

    toMIDIInTune() {
        let playbackData = new PlaybackData(evalFraction(this.L), this.tempo.bpm);
        for(let instrument of this.instruments) {
            for(let voice of instrument.inTunePlaybackData) playbackData.addVoice(voice);
        }
        return playbackData;
    }

    toMIDIDetuned() {
        let playbackData = new PlaybackData(evalFraction(this.L), this.tempo.bpm);
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
}