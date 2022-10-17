import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Tune } from "./utils/Tune";
import {MIDIPlayer} from "./features/playback/components/MIDIPlayer";
import {NoteDisplay} from "./features/music-notation/NoteDisplay";
import { INSTRUMENTS_IN_SCORE_ORDER } from "./utils/instruments/constants";
import { Piano } from './utils/instruments/Piano';

function App() {
  const t = new Tune("C", "1/4", "C", 60);
  const flute = t.addInstrument(INSTRUMENTS_IN_SCORE_ORDER.FLUTE, "1");
  flute.addVoice("cdef | g/f/e/d/ c2 |]", 0, []);
  const detunedFlute = t.addInstrument(INSTRUMENTS_IN_SCORE_ORDER.FLUTE, "2")
  detunedFlute.addVoice("cdef | g/f/e/d/ c2 |]", -0.25, []);
  const partiallyDetunedClar = t.addInstrument(INSTRUMENTS_IN_SCORE_ORDER.B_FLAT_CLARINET, "1");
  partiallyDetunedClar.addVoice("cdef | g/f/e/d/ c2 |]", 0, [
    {
      chordIndex: 8,
      detunePitches: [
        {
          pitch: "c",
          detuneBy: 0.5
        }
      ]
    }
  ])
  const piano = t.addInstrument(INSTRUMENTS_IN_SCORE_ORDER.PIANO, "");
  (piano as Piano).addVoiceLH("[CEG]2 [CEA]2 | [CEG] [GFDB,] [CEGc]2 |]", 0, []);
  (piano as Piano).addVoiceRH("C,4 | G, G,, C,2 |]", 0, []);

  console.log(t.toMIDIInTune());

  return (
    <div className="App">
      <NoteDisplay abcNotation={t.toABC()} />
      <MIDIPlayer volume={0.2} playbackData={t.toMIDIInTune()} />
      <MIDIPlayer volume={0.2} playbackData={t.toMIDIDetuned()} />
    </div>
  );
}

export default App;
