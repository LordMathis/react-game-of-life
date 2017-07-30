import React from 'react';

const Board = (props) => (
  <div className="App">
    <canvas id="canvas" width={props.width * 10} height={props.height * 10} onClick={props.onClick}>
    </canvas>
    <div className="button-row">
      <button className="btn-pause" onClick={props.onPause}>
        {props.interval ? "Pause" : "Start"}
      </button>
      <button className="btn-clear" onClick={props.onClear}>
        Clear
      </button>
      <button className="btn-gen" onClick={props.onGenerate} disabled={props.interval}>
        Generate
      </button>
      <label>
        {'Generations: ' + props.generation}
      </label>
      <input type="range" value={props.speed} min={10} max={1000} onChange={props.onSpeedUpdate}></input>
      <input type="text" value={props.heightToSet} onChange={props.onHeightUpdate}></input>
      <input type="text" value={props.widthToSet} onChange={props.onWidthUpdate}></input>
    </div>
  </div>
)

export default Board;
