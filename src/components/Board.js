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
        <i className="glyphicon glyphicon-cog" aria-hidden="true"></i>
      </button>
    </div>
    <div className={props.showSettings ? "" : "hidden"}>
      <div className="list-group col-md-3">
        <button className="btn btn-default list-group-item" onClick={props.onClear}>
          Clear
        </button>
        <button className="btn btn-default list-group-item" onClick={props.onGenerate} disabled={props.interval}>
          Generate
        </button>
        <div className="list-group-item">
          <label className="label label-primary label-gen">
            {'Speed: ' + props.speed}
          </label>
          <input type="range" className="list-group-item speed-range" value={props.speed} min={10} max={1000} onChange={props.onSpeedUpdate}></input>
        </div>
        <input type="text" className="list-group-item" value={props.heightToSet} onChange={props.onHeightUpdate}></input>
        <input type="text" className="list-group-item" value={props.widthToSet} onChange={props.onWidthUpdate}></input>
      </div>
    </div>
  </div>
)

export default Board;
