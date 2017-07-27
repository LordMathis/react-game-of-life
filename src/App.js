import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.update = this.update.bind(this);
    this.redraw = this.redraw.bind(this);

    let height = 50;
    let width = 50;
    let speed = 100;
    let generation = 0;
    let board = [];
    let updated = [];

    for (let i = 0; i < height; i++) {
        const row = [];
        const updateRow = [];
        for (let j = 0; j < width; j++) {
            const cell = Math.random() > 0.85 ? 1 : 0;
            row.push(cell);
            updateRow.push(1);
        }
        board.push(row);
        updated.push(updateRow);
    }

    this.state = {
      "height": height,
      "width": width,
      "generation": generation,
      "board": board,
      "updated": updated,
      "speed": speed,
    }
  }

  componentDidMount() {
    this.redraw();
    setInterval(this.update, this.state.speed);
  }

  redraw() {

    console.log(JSON.stringify(this.state.board));

    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      for (var i = 0; i < this.state.height; i++) {
        for (var j = 0; j < this.state.width; j++) {
          if (this.state.updated[i][j] === 1) {
            let cell = this.state.board[i][j];
            if (cell === 0) {
              ctx.fillStyle = 'rgb(0, 0, 0)';
              ctx.fillRect(j*10, i*10, 9, 9);
            } else {
              ctx.fillStyle = 'rgb(0, 0, 255)';
              ctx.fillRect(j*10, i*10, 9, 9);
            }
          }
        }
      }
    }
  }

  update() {
    let board = JSON.parse(JSON.stringify(this.state.board));
    let updated = JSON.parse(JSON.stringify(this.state.updated));

    for (var i = 0; i < this.state.height; i++) {
      for (var j = 0; j < this.state.width; j++) {
        let neighbours = 0;
        let x, y;

        x = (i - 1) < 0 ? (this.state.height - 1) : (i - 1);
        for (var k = 0; k < 3; k++) {
          y = (j - 1) < 0 ? (this.state.width - 1) : (j - 1)
          for (var l = 0; l < 3; l++) {
            if ((x !== i) || (y !== j)) {
              neighbours += this.checkCell(x,y);
            }
            y = (y + 1) < this.state.width ? (y + 1) : 0;
          }
          x = (x + 1) < this.state.height ? (x + 1) : 0;
        }

        if (( (neighbours === 2) && (board[i][j] === 1) ) || (neighbours === 3) ) {
          board[i][j] = 1;
        } else {
          board[i][j] = 0;
        }

        if (board[i][j] === this.state.board[i][j]) {
          updated[i][j] = 0;
        } else {
          updated[i][j] = 1;
        }
      }
    }

    this.setState({
      "board": board,
      "updated": updated,
    }, this.redraw);
  }

  checkCell(x, y) {
    let height = this.state.height;
    let width = this.state.width
    if ((x < height) && (x >= 0) && (y < width) && (y >= 0) && (this.state.board[x][y] === 1)) {
      return 1;
    } else {
      return 0;
    }
  }

  render() {
    return (
      <div className="App">
        <canvas id="canvas" width={this.state.width * 10} height={this.state.height * 10}>
        </canvas>
      </div>
    );
  }
}

export default App;
