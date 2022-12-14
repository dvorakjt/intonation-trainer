import React, {useState} from 'react';
import { NoteDisplay } from '../../music-notation/NoteDisplay';
import { MIDIPlayer } from './MIDIPlayer';
import { Tune } from '../../../utils/tune/Tune';
import styles from "./player-styles.module.css";

type NotatedMIDIPlayerProps = {
    tune:Tune;
    isTuningExercise:boolean;
    showInTunePlayer:boolean;
    showConcertPitchDisplayOption:boolean;
}

export const NotatedMIDIPlayer = ({tune, isTuningExercise, showInTunePlayer, showConcertPitchDisplayOption}:NotatedMIDIPlayerProps) => {
    const [showInConcertPitch, setShowInConcertPitch] = useState(false);
    const [volume, setVolume] = useState(0.025);
    const [player1IsActive, setPlayer1IsActive] = useState(false);
    const [player2IsActive, setPlayer2IsActive] = useState(false);

    return (
        <div className={styles.container}>
            <NoteDisplay abcNotation={showInConcertPitch ? tune.toCPABC() : tune.toABC()} />
            <div className={styles.controls}>
                <div className={styles.playBtnContainer}>
                    <small className={styles.controlsText}>Play Exercise</small>
                    <MIDIPlayer volume={volume} controlsNotation={true} playbackData={isTuningExercise ? tune.toMIDIDetuned() : tune.toMIDIInTune()} disabled={player2IsActive} parentStateFunction={setPlayer1IsActive} />
                </div>
                
                <div className={styles.playBtnContainer}>
                    {showInTunePlayer && <>
                        <small className={styles.controlsText}>Play In-Tune Version</small>
                        <MIDIPlayer volume={volume} controlsNotation={true} playbackData={tune.toMIDIInTune()} disabled={player1IsActive} parentStateFunction={setPlayer2IsActive} />
                    </>}
                </div>
                <div className={styles.checkboxContainer}>
                    <input type="checkbox" onChange={(event) => setShowInConcertPitch(event.target.checked)}/><label className={styles.controlsText}>Display in Concert Pitch</label>
                </div>
                <label className={styles.controlsText}>Volume
                </label>
                <input type="range" 
                    value={volume}
                    min={0}
                    max={0.05}
                    step={0.0005}
                    onChange={(event) => {
                    const newVolume = Number(event.target.value);
                    console.log(newVolume);
                    setVolume(newVolume);
                }} />
            </div>
        </div>
    );
}