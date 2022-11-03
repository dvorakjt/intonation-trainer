import { evalFraction } from "../generic/evalFraction";
import { PlaybackData } from "./playback/PlaybackData";
import { Instrument } from "../instruments/superclasses/Instrument";
import { Flute } from "../instruments/instrument-classes/woodwinds/flutesAndPiccolo/Flute";
import { Piano } from "../instruments/instrument-classes/keyboards/Piano";
import { INSTRUMENTS_IN_SCORE_ORDER } from "../instruments/constants";
import { BbClarinet } from "../instruments/instrument-classes/woodwinds/clarinets/BbClarinet";
import { TransposingInstrument } from "../instruments/superclasses/TransposingInstrument";
import { Oboe } from "../instruments/instrument-classes/woodwinds/oboeAndEnglishHorn/Oboe";
import { AClarinet } from "../instruments/instrument-classes/woodwinds/clarinets/AClarinet";
import { Bassoon } from "../instruments/instrument-classes/woodwinds/bassoonAndContra/Bassoon";
import { FrenchHorn } from "../instruments/instrument-classes/brass/FrenchHorn";
import { EnglishHorn } from "../instruments/instrument-classes/woodwinds/oboeAndEnglishHorn/EnglishHorn";
import { BassClarinet } from "../instruments/instrument-classes/woodwinds/clarinets/BassClarinet";
import { EbClarinet } from "../instruments/instrument-classes/woodwinds/clarinets/EbClarinet";

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

    //Factory method
    addInstrument(instrument:number, partLabel:string) : Instrument {
        let i;
        switch(instrument) {
            case INSTRUMENTS_IN_SCORE_ORDER.FLUTE :
                i = new Flute(this.tempo.noteValue, this.K, partLabel);
                break;
            case INSTRUMENTS_IN_SCORE_ORDER.OBOE :
                i = new Oboe(this.tempo.noteValue, this.K, partLabel);
                break;
            case INSTRUMENTS_IN_SCORE_ORDER.ENGLISH_HORN :
                i = new EnglishHorn(this.tempo.noteValue, this.K, partLabel);
                break;
            case INSTRUMENTS_IN_SCORE_ORDER.E_FLAT_CLARINET :
                i = new EbClarinet(this.tempo.noteValue, this.K, partLabel);
                break;
            case INSTRUMENTS_IN_SCORE_ORDER.B_FLAT_CLARINET :
                i = new BbClarinet(this.tempo.noteValue, this.K, partLabel);
                break;
            case INSTRUMENTS_IN_SCORE_ORDER.A_CLARINET :
                i = new AClarinet(this.tempo.noteValue, this.K, partLabel);
                break;
            case INSTRUMENTS_IN_SCORE_ORDER.BASS_CLARINET :
                i = new BassClarinet(this.tempo.noteValue, this.K, partLabel);
                break;
            case INSTRUMENTS_IN_SCORE_ORDER.BASSOON :
                i = new Bassoon(this.tempo.noteValue, this.K, partLabel);
                break;
            case INSTRUMENTS_IN_SCORE_ORDER.FRENCH_HORN :
                i = new FrenchHorn(this.tempo.noteValue, this.K, partLabel);
                break;
            case INSTRUMENTS_IN_SCORE_ORDER.PIANO :
                i = new Piano(this.tempo.noteValue, this.K, partLabel);
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