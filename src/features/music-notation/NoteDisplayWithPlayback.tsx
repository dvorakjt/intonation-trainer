import React, {useEffect, Component} from 'react';
import abcjs from 'abcjs';
//import styles from "./note-display-with-playback.module.css";

type NoteDisplayProps = {
    abcNotation:string;
}

export const NoteDisplayWithPlayback = ({abcNotation}:NoteDisplayProps) => {
    const id = "target" + Math.random() * 100;

    useEffect(() => {
        const target = document.getElementById(id);
        target && abcjs.renderAbc(target, abcNotation);
    }, []);

    useEffect(() => {
      const target = document.getElementById(id);
      target && abcjs.renderAbc(target, abcNotation);
  }, [abcNotation]);

    return (
          <div id={id}>
          </div>
    )
}