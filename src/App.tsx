import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Tune } from "./utils/Tune";
import {MIDIPlayer} from "./features/playback/components/MIDIPlayer";
import {NoteDisplay} from "./features/music-notation/NoteDisplay";
import { INSTRUMENTS } from "./utils/instruments/constants/instruments";
import { Piano } from './utils/instruments/Piano';

function App() {
  const t = new Tune("C", "1/4", "C", 60);
  const flute = t.addInstrument(INSTRUMENTS.FLUTE, "1");
  flute.addVoice("cdef | g/f/e/d/ c2 |]", 0, []);
  const detunedFlute = t.addInstrument(INSTRUMENTS.FLUTE, "2")
  detunedFlute.addVoice("cdef | g/f/e/d/ c2 |]", -0.25, []);
  const piano = t.addInstrument(INSTRUMENTS.PIANO, "");
  (piano as Piano).addVoiceLH("[CEG]2 [CEA]2 | [CEG] [GFDB,] [CEGc]2 |]", 0, []);
  (piano as Piano).addVoiceRH("C,4 | G, G,, C,2 |]", 0, []);

  console.log(t.toABC());

  return (
    <div className="App">
      <NoteDisplay abcNotation={t.toABC()} />
      <MIDIPlayer volume={0.2} playbackData={t.toMIDIInTune()} />
      <MIDIPlayer volume={0.2} playbackData={t.toMIDIDetuned()} />
    </div>
  );
}

export default App;
