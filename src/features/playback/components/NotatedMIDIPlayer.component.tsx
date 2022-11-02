import React, {useState} from 'react';
import { NoteDisplay } from '../../music-notation/NoteDisplay';
import { MIDIPlayer } from './MIDIPlayer';
import { Tune } from '../../../utils/tune/Tune';

type NotatedMIDIPlayerProps = {
    tune:Tune;
    showDetunedPlayer:boolean;
    showConcertPitchDisplayOption:boolean;
}

export const NotatedMIDIPlayer = ({tune, showDetunedPlayer, showConcertPitchDisplayOption}:NotatedMIDIPlayerProps) => {

    const [player1IsActive, setPlayer1IsActive] = useState(false);
    const [player2IsActive, setPlayer2IsActive] = useState(false);

    return (
        <>
    <MIDIPlayer volume={0.2} controlsNotation={true} playbackData={tune.toMIDIInTune()} disabled={player2IsActive} parentStateFunction={setPlayer1IsActive} />
    <MIDIPlayer volume={0.2} controlsNotation={true} playbackData={tune.toMIDIDetuned()} disabled={player1IsActive} parentStateFunction={setPlayer2IsActive} />
    </>
    );
}