import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tune from "./utils/Tune";
import {MIDIPlayer} from "./features/playback/components/MIDIPlayer";
import {NoteDisplay} from "./features/music-notation/NoteDisplay";

function App() {
  //recompile
  const t = new Tune("C", "1/4", "(Clarinet) {(1 2) (3 4)}", "C", 1/4, 76);
  t.addVoice("1", "C", 0, "treble", "cedc|cBBc|c4|]", "Piano");
  t.addVoice("2", "C", 0, "treble", "[GEC]2F2|E2D2|[G_EC]4|]");
  t.addVoice("3", "C", 0, "bass", "G,2A,2|G,2G,2|G,4|]");
  t.addVoice("4", "C", 0, "bass", "C,2F,2|G,2G,,2|C,4|]");
  t.addVoice("Clarinet", "D", -2, "treble", "D F E D | D C C D | D4 |]", "B-flat Clarinet");

  console.log(t.toABC());
  console.log(t.toMIDI());

  return (
    <div className="App">
      <NoteDisplay abcNotation={t.toABC()} />
      <MIDIPlayer volume={0.5} playbackData={t.toMIDI()} />
    </div>
  );
}

export default App;
