import { Component } from "react";
import { PlaybackData } from "../../../utils/tune/playback/PlaybackData";
import MIDISounds from "midi-sounds-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faStop } from "@fortawesome/free-solid-svg-icons";
import styles from "./player-styles.module.css";

type PlayerProps = {
    playbackData:PlaybackData;
    volume:number;
    controlsNotation:boolean;
    disabled:boolean;
    parentStateFunction:any;
}

type PlayerState = {
    playing:boolean;
    volume:number;
    coolingDown:boolean;
    disabled:boolean;
}

export class MIDIPlayer extends Component<PlayerProps, PlayerState> {
  state = {
    playing: false,
    volume: this.props.volume,
    coolingDown:false,
    disabled: this.props.disabled
  }

  timeoutIds:any[] = [];

  stopPlayingTimeoutId:any = null;

  midiSounds:any;

  componentDidMount() {
    this.midiSounds.setMasterVolume(this.state.volume);
  }

  componentDidUpdate(prevProps:PlayerProps) {
    if (this.props.volume !== prevProps.volume) {
      this.setState({ ...this.state, volume: this.props.volume });
      this.midiSounds.setMasterVolume(this.props.volume);
    }
    if(this.props.disabled !== prevProps.disabled) {
      this.setState({...this.state, disabled: this.props.disabled});
    }
  }

  playMelody() {
    if(this.stopPlayingTimeoutId) clearTimeout(this.stopPlayingTimeoutId);
    const currentTime = this.midiSounds.contextTime();
    let totalTime = 0;
    let svgIndex = 0;
    const SVGElements:any[] = [];
    this.props.playbackData.voices.forEach((voice) => {
      totalTime = 0;
      const { instrument, chords } = voice;
      chords.forEach(c => {
          const { pitches, duration } = c;
          const noteDur = this.props.playbackData.wholeNoteDuration * duration;
          if(pitches.length) {
            this.midiSounds.playChordAt(
              currentTime + totalTime,
              instrument,
              pitches,
              noteDur
            );
          }
          if(this.props.controlsNotation) {
            SVGElements.push({
              index: svgIndex,
              startTime: totalTime * 1000,
              duration: noteDur * 1000
            });
            svgIndex++;
          }
          //always add the duration to total time, whether a chord plays or not
          totalTime += noteDur;
      });
    });
    this.stopPlayingTimeoutId = setTimeout(() => {
      this.setState({ ...this.state, playing: false });
      if(this.props.parentStateFunction) this.props.parentStateFunction(false);
    }, totalTime * 1000);
    
    if(this.props.controlsNotation) {
      SVGElements.forEach((elem) => {
        const id = setTimeout(() => {
          const el = document.querySelectorAll(`[data-index="${elem.index}"]`)[0];
          el.classList.remove(styles.unhighlighted);
          el.classList.add(styles.highlighted);
          setTimeout(() => {
            el.classList.add(styles.unhighlighted);
            el.classList.remove(styles.highlighted);
          }, elem.duration);
        }, elem.startTime);
        this.timeoutIds.push(id);
      });
    }
  }

  handleClick() {
    if (!this.state.playing) {
      if(this.props.parentStateFunction) this.props.parentStateFunction(true);
      this.setState({ ...this.state, playing: true });
      this.playMelody();
    } else {
      if(this.props.parentStateFunction) this.props.parentStateFunction(false);
      this.setState({ ...this.state, playing: false, coolingDown: true });
      this.midiSounds.cancelQueue();
      for(let i = 0; i < this.timeoutIds.length; i++) {
        clearTimeout(this.timeoutIds[i]);
      }
      this.timeoutIds = [];
      const highlightedNotes = Array.from(document.getElementsByClassName(styles.highlighted));
      highlightedNotes.forEach((elem) => {
        elem.classList.add(styles.unhighlighted);
        elem.classList.remove(styles.highlighted);
      });
      setTimeout(() => {
        this.setState({...this.state, coolingDown: false});
      }, 250);
    }
  }

  render() {
    return (
      <>
        <div style={{ display: "none" }}>
          <MIDISounds
            ref={(ref) => (this.midiSounds = ref)}
            appElementName="root"
            instruments={Array.from(this.props.playbackData.instruments)}
          />
        </div>
        <button
          onClick={this.handleClick.bind(this)}
          disabled={this.state.disabled || this.state.coolingDown}
        >
          <FontAwesomeIcon
            style={{ color: this.state.playing ? "A86561" : "#008080" }}
            icon={!this.state.playing ? faPlay : faStop}
            size="2x"
          />
        </button>
      </>
    );
  }
}
