import { Chord } from "./Chord";
import keys from "../../key-signatures";
import tables from "../../midi-number-tables";

function getSlashMultiplier(notation:string) {
    let multiplier = 1;
    const slashRegex = /\/+/;
    const slashes = notation.match(slashRegex);
    if(slashes && slashes.length > 0) {
        multiplier *= Math.pow(0.5, slashes[0].length);
    }
    return multiplier;
}

function getDurationMultiplier(notation:string) {
    let multipier = 1;
    const multiplierRegex = /\d+/;
    const multipliers = notation.match(multiplierRegex);
    if(multipliers && multipliers.length > 0) {
        multipier *= Number(multipliers[0]);
    }
    return multipier;
}

function getDuration(L:number, notation:string) {
    let duration = L;
    duration *= getSlashMultiplier(notation);
    duration *= getDurationMultiplier(notation);
    return duration;
}

function getMidiArray(key:string, notation:string, transpose:number) {
    const midiNotes:number[] = [];
    const notesRegex = /\^{0,2}_{0,2}={0,1}([A-G]|z),*'*/gmi; //find notes
    const noteStrings = notation.match(notesRegex);
    if(key.includes("#")) {
        key.replace("#", "sharp");
    }
    noteStrings?.forEach(note => {
        //if the note is a natural note that doesn't begin with an = sign, look up the note in the key, and update the accidental accordingly
        const midiNum = noteToMidiNumber(note, key, transpose);
        if(midiNum) midiNotes.push(midiNum); //midiNum can be null if it is a rest, so only push it to the array if it is not a rest!
    });
    return midiNotes;
}

export function noteToMidiNumber(note:string, key:string, transpose:number) {
    //if the note is a rest, set the midinum to null
    if(note.includes("z")) {
        return null;
    }
    const keySignature = keys[key as keyof typeof keys];
    if(/[A-G]/i.test(note[0])) {
        const accidental = keySignature[note[0].toUpperCase() as keyof typeof keySignature];
        note = accidental + note;
    }
    let midiNum = null;
    if(note.includes("__")) {
        midiNum = tables.doubleFlatNotes[note as keyof typeof tables.doubleFlatNotes];
    }
    else if(note.includes("^^")) {
        midiNum = tables.doubleSharpNotes[note as keyof typeof tables.doubleSharpNotes];
    }
    else if(note.includes("_")) {
        midiNum = tables.flatNotes[note as keyof typeof tables.flatNotes];
    }
    else if(note.includes("^")) {
        midiNum = tables.sharpNotes[note as keyof typeof tables.sharpNotes];
    }
    else {
        //if the note includes a natural sign, remove it
        if(note.includes("=")) {
            note = note.slice(1, note.length); 
        }
        midiNum = tables.naturalNotes[note as keyof typeof tables.naturalNotes];
    }
    if(midiNum) {
        midiNum += transpose;
    }
    return midiNum;
}

export function notationToChords(L:number, key:string, transpose:number, notation:string) {
    const chords:Chord[] = [];
    const chordsOrNotesRegex = /(\[(\^{0,2}_{0,2}={0,1}[A-G],*'*)+\]*\/*\d*)|(\^{0,2}_{0,2}={0,1}([A-G]|z),*'*\/*\d*)/gmi;
    const chordsAndNotes = notation.match(chordsOrNotesRegex);

    chordsAndNotes?.forEach(chordNotation => {
        //get the notes
        const notes = getMidiArray(key, chordNotation, transpose);
        //get the duration
        const duration = getDuration(L, chordNotation);
        //create a new chord
        chords.push(new Chord(notes, duration));
    });

    return chords;
}