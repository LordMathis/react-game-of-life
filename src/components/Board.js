import React from 'react';
import { Settings, Controls } from '.';
import './Board.css';

const Board = (props) => (
  <div>
    <canvas id="canvas" width={props.width * 10} height={props.height * 10} onClick={props.onClick}>
    </canvas>
    <Controls
      interval={props.interval}
      generation={props.generation}
      onPause={props.onPause}
      onSettings={props.onSettings}/>
    <Settings
      showSettings={props.showSettings}
      speed={props.speed}
      btnDisabled={props.interval}
      heightToSet={props.heightToSet}
      widthToSet={props.widthToSet}
      onClear={props.onClear}
      onHeightUpdate={props.onHeightUpdate}
      onWidthUpdate={props.onWidthUpdate}
      onGenerate={props.onGenerate}
      onSpeedUpdate={props.onSpeedUpdate}
      />

  </div>
)

export default Board;
