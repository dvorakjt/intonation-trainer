import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Tune } from "./utils/tune/Tune";
import {MIDIPlayer} from "./features/playback/components/MIDIPlayer";
import { NotatedMIDIPlayer } from './features/playback/components/NotatedMIDIPlayer.component';
import {NoteDisplay} from "./features/music-notation/NoteDisplay";
import { INSTRUMENTS_IN_SCORE_ORDER } from "./utils/instruments/constants";
import { Piano } from './utils/instruments/instrument-classes/keyboards/Piano';

function App() {
  const [showInConcertPitch, setShowInConcertPitch] = useState(false);

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
          pitch: "d", //right now, this has to be the WRITTEN pitch. I need to fix this somehow
          detuneBy: 0.5
        }
      ]
    }
  ])
  const piano = t.addInstrument(INSTRUMENTS_IN_SCORE_ORDER.PIANO, "");
  (piano as Piano).addVoiceLH("z2 [CEA]2 | [CEG] [GFDB,] [CEGc]2 |]", 0, []);
  (piano as Piano).addVoiceRH("C,4 | G, G,, C,2 |]", 0, []);

  return (
    <div className="App">
      <NoteDisplay abcNotation={!showInConcertPitch ? t.toABC() : t.toCPABC()} />
      <input type="checkbox" onChange={(e) => {
        setShowInConcertPitch(e.target.checked);
      }} /><label>Display in Concert Pitch</label><br />
      <NotatedMIDIPlayer tune={t} showConcertPitchDisplayOption={true} showDetunedPlayer={true} />
    </div>
  );
}

export default App;
