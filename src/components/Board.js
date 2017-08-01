import React from 'react';
import './Board.css';

const Board = (props) => (
  <div className="App">
    <canvas id="canvas" width={props.width * 10} height={props.height * 10} onClick={props.onClick}>
    </canvas>
    <div className="button-row">

      <button className="btn btn-default" onClick={props.onPause}>
        <i className={props.interval ? "glyphicon glyphicon-pause" : "glyphicon glyphicon-play"} aria-hidden="true"></i>
      </button>
      <label className="label label-primary label-gen">
        {'Generations: ' + props.generation}
      </label>
      <button className="btn btn-default" onClick={props.onSettings}>
        <i className="glyphicon glyphicon-cog" aria-hidden="true"> </i>
      </button>

  </div>
    <div className={props.showSettings ? "dropdown-content" : "dropdown-content hidden"}>
      <button className="btn btn-default dropdown-item" onClick={props.onClear}>
        Clear
      </button>
      <button className="btn btn-default dropdown-item" onClick={props.onGenerate} disabled={props.interval}>
        Generate
      </button>
      <div className="dropdown-item">
        <label className="label label-default label-gen">
          {'Speed: ' + props.speed}
        </label>
        <input type="range" className="speed-range" value={props.speed} min={10} max={1000} onChange={props.onSpeedUpdate}></input>
      </div>
      <div className="dropdown-item">
        <label className="label label-default label-gen">
          {'Height:'}
        </label>
        <input type="text" className="" value={props.heightToSet} onChange={props.onHeightUpdate}></input>
      </div>
      <div className="dropdown-item">
        <label className="label label-default label-gen">
          {'Width:'}
        </label>
        <input type="text" className="" value={props.widthToSet} onChange={props.onWidthUpdate}></input>
      </div>
    </div>

  </div>
)

export default Board;
