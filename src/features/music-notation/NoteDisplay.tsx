import React, {useEffect} from 'react';
import abcjs from 'abcjs';
//import styles from "./note-display-with-playback.module.css";

type NoteDisplayProps = {
    abcNotation:string;
}

export const NoteDisplay = ({abcNotation}:NoteDisplayProps) => {
    useEffect(() => {
        const target = document.getElementById("target");
        target && abcjs.renderAbc(target, abcNotation);
    }, []);

    return (
        <div>
          <h2>Ear trainer (WIP, begun 9-1-2022)</h2>
          <p>below are the beginnings to an ear training application.</p>
          <div id="target">
          </div>
          <p>This application will feature:</p>
          <ul style={{listStyleType:"none"}}>
            <li>Midi orchestra instrument sounds</li>
            <li>Interval identification</li>
            <li>Scale identification</li>
            <li>Chord identification</li>
            <li>Intonation practice on various intervals and scales</li>
            <li>Intonation practice on melody plus accompaniment</li>
          </ul>
          <p>Stay tuned for more!</p>
        </div>
    )
}