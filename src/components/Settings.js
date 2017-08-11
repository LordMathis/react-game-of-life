import React from 'react';
import './Settings.css';

const Settings = (props) => (
  <div className={props.showSettings ? "dropdown-content" : "dropdown-content hidden"}>
    <button className="btn btn-default dropdown-item" onClick={props.onClear}>
      Clear
    </button>
    <button className="btn btn-default dropdown-item" onClick={props.onGenerate} disabled={props.btnDisabled}>
      Generate
    </button>
    <div className="dropdown-item">
      <label className="label label-default label-gen">
        {'Speed: ' + ((1000 - props.speed)/10 + 1) + '%'}
      </label>
      <input type="range" className="speed-range" value={props.speed} min={10} max={1000} onChange={props.onSpeedUpdate}></input>
    </div>
    <div className="dropdown-item">
      <label className="label label-default label-gen">
        {'Height:'}
      </label>
      <input type="text" value={props.heightToSet} onChange={props.onHeightUpdate}></input>
    </div>
    <div className="dropdown-item">
      <label className="label label-default label-gen">
        {'Width:'}
      </label>
      <input type="text" value={props.widthToSet} onChange={props.onWidthUpdate}></input>
    </div>
  </div>
)

export default Settings;
