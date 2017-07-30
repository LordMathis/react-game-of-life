import React from 'react';
import './Board.css';

const Board = (props) => (
  <div className="App">
    <canvas id="canvas" width={props.width * 10} height={props.height * 10} onClick={props.onClick}>
    </canvas>
    <div className="button-row">
      <button className="btn-pause" onClick={props.onPause}>
        <i className={props.interval ? "fa fa-pause" : "fa fa-play"} aria-hidden="true"></i>
      </button>
      <label>
        {'Generations: ' + props.generation}
      </label>
      <button className="btn-settings" onClick={props.onSettings}>
        <i className="fa fa-cog" aria-hidden="true"></i>
      </button>
    </div>
    <div className={props.showSettings ? "button-row" : "button-row hidden"}>
      <button className="btn-clear" onClick={props.onClear}>
        Clear
      </button>
      <button className="btn-gen" onClick={props.onGenerate} disabled={props.interval}>
        Generate
      </button>
      <input type="range" value={props.speed} min={10} max={1000} onChange={props.onSpeedUpdate}></input>
      <input type="text" value={props.heightToSet} onChange={props.onHeightUpdate}></input>
      <input type="text" value={props.widthToSet} onChange={props.onWidthUpdate}></input>
    </div>
  </div>
)

export default Board;
