import React from 'react';
import BoardContainer from './containers/BoardContainer';
import './App.css';

const App = () => (
  <div className="App">
    <div className="App-header">
      <h2>Game of Life</h2>
    </div>
    <div>
      <BoardContainer/>
    </div>
  </div>
)

export default App;
