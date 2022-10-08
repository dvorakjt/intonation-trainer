import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tune from "./utils/Tune";

function App() {
  //recompile
  const t = new Tune("C", "1/4", "Clarinet {(1 2) (3 4)}", "C", 1/4, 76);
  t.addVoice("1", "C", 0, "treble", "cedc|cBBc|c4|]");
  t.addVoice("2", "C", 0, "treble", "[GEC]2F2|E2D2|E4|]");
  t.addVoice("3", "C", 0, "bass", "G,2A,2|G,2G,2|G,4|]");
  t.addVoice("4", "C", 0, "bass", "C,2F,2|G,2G,,2|C,4|]");
  t.addVoice("Clarinet", "D", -2, "treble", "D ^F E D | D ^C ^C D | D4 |] ");

  console.log(t.toABC());
  console.log(t.toMIDI());

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
