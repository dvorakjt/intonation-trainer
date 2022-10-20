import { Component } from "react";
import { PlaybackData } from "../../../utils/tune/playback/PlaybackData";
import MIDISounds from "midi-sounds-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faStop } from "@fortawesome/free-solid-svg-icons";
// import styles from "./midi-player.module.css";

type PlayerProps = {
    playbackData:PlaybackData;
    volume:number;
}

type PlayerState = {
    playing:boolean;
    volume:number;
}

export class MIDIPlayer extends Component<PlayerProps, PlayerState> {
  state = {
    playing: false,
    volume: this.props.volume
  }

  midiSounds:any;

  componentDidMount() {
    this.midiSounds.setMasterVolume(this.state.volume);
  }

  componentDidUpdate(prevProps:PlayerProps) {
    if (this.props.volume !== prevProps.volume) {
      this.setState({ ...this.state, volume: this.props.volume });
      this.midiSounds.setMasterVolume(this.props.volume);
    }
  }

  playMelody() {
    const currentTime = this.midiSounds.contextTime();
    this.setState({ ...this.state, playing: true });
    let totalTime = 0;
    let svgIndex = 0;
    const SVGElements:any[] = [];
    this.props.playbackData.voices.forEach((voice) => {
      totalTime = 0;
      const { instrument, chords } = voice;
      chords.forEach(c => {
          const { pitches, duration } = c;
          const noteDur = this.props.playbackData.wholeNoteDuration * duration;
          //pitches will be an empty array if it is a rest
          if(pitches.length) {
            this.midiSounds.playChordAt(
              currentTime + totalTime,
              instrument,
              pitches,
              noteDur
            );
          }
          SVGElements.push({
            index: svgIndex,
            startTime: Number(String(currentTime + totalTime)),
            endTime: Number(String(currentTime + totalTime + noteDur))
          });
          svgIndex++;
          //always add the duration to total time, whether a chord plays or not
          totalTime += noteDur;
      });
    });
    setTimeout(() => {
      this.setState({ ...this.state, playing: false });
    }, totalTime * 1000);
    //LOGIC FOR SELECTING NOTES NEEDS MORE WORK
    let processedElements = 0;
    const foo = document.querySelectorAll(`[data-index="${12}"]`)[0];
    foo.setAttribute("fill", "#ff0000");
    while(processedElements < svgIndex) {
      const currentTime = this.midiSounds.contextTime();
      for(let i = 0; i < SVGElements.length; i++) {
        const svgElem = document.querySelectorAll(`[data-index="${SVGElements[i].index}"]`)[0];
        console.log(SVGElements[i].startTime, SVGElements[i].endTime, currentTime);
        if(SVGElements[i].startTime >= currentTime && SVGElements[i].endTime <= currentTime) {
          console.log("elem found");
          svgElem.setAttribute("fill", "#ff0000");
          processedElements++;
        } else {
          console.log("else");
          svgElem.setAttribute("fill", "#000000");
        }
      }
      processedElements++;
    }
  }

  handleClick() {
    if (!this.state.playing) {
      this.setState({ ...this.state, playing: true });
      this.playMelody();
    } else {
      this.setState({ ...this.state, playing: false });
      this.midiSounds.cancelQueue();
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
