const fs = require('fs');

const pitches = ["A", "B", "C", "D", "E", "F", "G"];

let midiNum = 23; //A 0

const modifiers = {
    commas: ",,,,",
    toLowerCase: false,
    apostrophes: ""
}

function nextPitchIndex(currentPitchIndex) {
    let newPitchIndex = currentPitchIndex + 1;
    if(newPitchIndex >= 7) newPitchIndex = 0;
    return newPitchIndex;
}

function incrementMidiNum(newPitchIndex, midiNum) {
    if(newPitchIndex === 2 || newPitchIndex === 5) { //2 = C, 5 = F
        return midiNum + 1;
    }
    return midiNum + 2;
}

function updateModifiers(modifiers) {
    if(modifiers.commas.length > 0) {
        modifiers.commas = modifiers.commas.slice(0, modifiers.commas.length - 1);
    } else if(modifiers.toLowerCase === false) {
        modifiers.toLowerCase = true;
    } else {
        modifiers.apostrophes += "'"
    }
}

const noteNamesToMidiNumbers = {};
let currentPitchIndex = 0;

while(midiNum <= 127) {
    let currentPitch = pitches[currentPitchIndex];
    if(modifiers.toLowerCase) currentPitch = currentPitch.toLowerCase();
    currentPitch += modifiers.commas;
    currentPitch += modifiers.apostrophes;
    currentPitch = "^^" + currentPitch;
    noteNamesToMidiNumbers[currentPitch] = midiNum;
    currentPitchIndex = nextPitchIndex(currentPitchIndex);
    midiNum = incrementMidiNum(currentPitchIndex, midiNum);
    if(currentPitchIndex === 2) updateModifiers(modifiers);
}

fs.writeFileSync("doubleSharpNotes.js", JSON.stringify(noteNamesToMidiNumbers, null, 2), 'utf-8');