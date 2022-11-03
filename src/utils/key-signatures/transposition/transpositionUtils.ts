import * as abcTranspose from "abc-transpose";
import { detuneChord } from "../../tune/Voice";

export const instrumentKeys = [
    "C",
    "D♭",
    "D",
    "E♭",
    "E",
    "F",
    "G♭",
    "G",
    "A♭",
    "A",
    "B♭",
    "B",
];

export function getTranspositionInSteps(key:string, higherThanConcertPitch:boolean) {
    let tranposition;
    if(higherThanConcertPitch) {
        tranposition = -1 * instrumentKeys.indexOf(key);
    } else {
        tranposition = 12 - instrumentKeys.indexOf(key);
    }
    return tranposition;
}

export function transposeKey(key:string, steps:number) {
    const abcTune = `K:${key}`;
    const tranposedTune = transposeAbcTune(abcTune, steps);
    const transposedKey = tranposedTune.substring(2);
    return transposedKey;
}

export function transposeNotes(key:string, notes:string, steps:number) {
    const abcTune = `K:${key}\n${notes}`;
    const transposedTune = transposeAbcTune(abcTune, steps);
    const keyAndNotes = transposedTune.split('\n');
    const transposedNotes = keyAndNotes[1];
    return transposedNotes;
} 

export function transposeDetunings(key:string, detunings:detuneChord[], steps:number) {
    return detunings.map((detuning) => {
        return {...detuning, detunePitches : detuning.detunePitches.map((detunePitch) => {
            return {
                ...detunePitch,
                pitch: transposeNotes(key, detunePitch.pitch, steps)
            }
        })}
    });
}

function transposeAbcTune(abcTune:string, steps:number) {
    if(steps === 0) return abcTune;
    else if(steps > 0) return abcTranspose.up(abcTune, steps);
    else {
        const positiveSteps = Math.abs(steps);
        return abcTranspose.down(abcTune, positiveSteps);
    }
}