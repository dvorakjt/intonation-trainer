import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Tune } from "./utils/tune/Tune";
import { NotatedMIDIPlayer } from './features/playback/components/NotatedMIDIPlayer.component';
import { UnnotatedMIDIPlayer } from './features/playback/components/UnnotatedMIDIPlayer';
import { INSTRUMENTS_IN_SCORE_ORDER } from "./utils/instruments/constants";

function App() {
  const [showInConcertPitch, setShowInConcertPitch] = useState(false);

  const t = new Tune("3/4", "1/8", "A", 120);
  const bassClarinet = t.addInstrument(INSTRUMENTS_IN_SCORE_ORDER.BASS_CLARINET, "");
  bassClarinet.addVoice("z4 z A, | A,E, F,3 D, | C,B,, A,,3 A, | F,E, D,2 B,,2 | A,,4 A,2", 0, []);
  const eFlatClarinet = t.addInstrument(INSTRUMENTS_IN_SCORE_ORDER.E_FLAT_CLARINET, "");
  eFlatClarinet.addVoice("z4 z e | ag a3 f | ed c3 e | ag a2 b2 | c'4 a2", 0, []);
  // const flute = t.addInstrument(INSTRUMENTS_IN_SCORE_ORDER.FLUTE, "");
  // const englishHorn = t.addInstrument(INSTRUMENTS_IN_SCORE_ORDER.ENGLISH_HORN, "");
  // const clarinet = t.addInstrument(INSTRUMENTS_IN_SCORE_ORDER.A_CLARINET, "");
  // const bassoon = t.addInstrument(INSTRUMENTS_IN_SCORE_ORDER.BASSOON, "");
  // const horn = t.addInstrument(INSTRUMENTS_IN_SCORE_ORDER.FRENCH_HORN, "");
  // flute.addVoice("z4 z e | ag a3 f | ed c3 e | ag a2 b2 | c'4 a2", 0, []);
  // englishHorn.addVoice("z4 z E | EE C3 D | E z z2 z2 | CE F2 G2 | A4 E2", 0,  []);
  // clarinet.addVoice("z4 z E | AG A3 F | ED C3 E | AG A2 B2 | c4 A2", 0.25, []);
  // bassoon.addVoice("z4 z A, | A,E, F,3 D, | C,B,, A,,3 A, | F,E, D,2 B,,2 | A,,4 A,2", 0, []);
  // horn.addVoice("z4 z C | CB, A,3 A, | A,4 A,C | A,B, D2 D2 | E4 C2", 0, []);
  return (
    <div className="App">
      <NotatedMIDIPlayer tune={t} isTuningExercise={true} showInTunePlayer={true} showConcertPitchDisplayOption={true}/>
    </div>
  );
}

export default App;
