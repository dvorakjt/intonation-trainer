import React, {useState} from 'react';
import { MIDIPlayer } from './MIDIPlayer';
import { Tune } from '../../../utils/tune/Tune';
import styles from './player-styles.module.css';

type UnnotatedMIDIPlayerProps = {
    tune:Tune;
    isTuningExercise:boolean;
    showInTunePlayer:boolean;
}

export const UnnotatedMIDIPlayer = ({tune, isTuningExercise, showInTunePlayer}:UnnotatedMIDIPlayerProps) => {
    const [volume, setVolume] = useState(0.025);
    const [player1IsActive, setPlayer1IsActive] = useState(false);
    const [player2IsActive, setPlayer2IsActive] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.controlsSm}>
                <div className={styles.playBtnContainer}>
                    <small className={styles.controlsText}>Play Exercise</small>
                    <MIDIPlayer volume={volume} controlsNotation={false} playbackData={isTuningExercise ? tune.toMIDIDetuned() : tune.toMIDIInTune()} disabled={player2IsActive} parentStateFunction={setPlayer1IsActive} />
                </div>
                
                <div className={styles.playBtnContainer}>
                    {showInTunePlayer && <>
                        <small className={styles.controlsText}>Play In-Tune Version</small>
                        <MIDIPlayer volume={volume} controlsNotation={false} playbackData={tune.toMIDIInTune()} disabled={player1IsActive} parentStateFunction={setPlayer2IsActive} />
                    </>}
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
    )
}
