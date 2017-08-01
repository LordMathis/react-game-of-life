import React, {Component} from 'react';
import Board from '../components/Board';

class BoardContainer extends Component {
  constructor() {
    super();

    this.update = this.update.bind(this);
    this.redraw = this.redraw.bind(this);
    this.generate = this.generate.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
    this.handleSpeedUpdate = this.handleSpeedUpdate.bind(this);
    this.handleHeightUpdate = this.handleHeightUpdate.bind(this);
    this.handleWidthUpdate = this.handleWidthUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSettings = this.handleSettings.bind(this);

    let height = 50;
    let width = 80;
    let speed = 100;

    this.state = {
      "height": height,
      "width": width,
      "heightToSet": height,
      "widthToSet": width,
      "speed": speed,
      "showSettings": null,
    }

  }

  componentDidMount() {
    this.generate();
    const interval = setInterval(this.update, this.state.speed);
    this.setState({
      "interval": interval,
    });
  }

  redraw() {
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
              ctx.fillStyle = 'rgb(48,113,169)';
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
      "generation": this.state.generation + 1,
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

  handlePause() {
    if (!this.state.interval) {
      var interval = setInterval(this.update, this.state.speed);
      this.setState({
        "interval": interval,
      });
    } else {
      clearInterval(this.state.interval);
      this.setState({
        "interval": null,
      })
    }
  }

  handleSpeedUpdate(event) {
    let speed = event.target.value

    if (this.state.interval) {
      clearInterval(this.state.interval)
      const interval = setInterval(this.update, speed);
      this.setState({
        "speed": speed,
        "interval": interval,
      });
    } else {
      this.setState({
        "speed": speed,
      });
    }
  }

  handleHeightUpdate(event) {
    const height = event.target.value;
    this.setState({
      "heightToSet": height,
    });
  }

  handleWidthUpdate(event) {
    const width = event.target.value;
    this.setState({
      "widthToSet": width,
    });
  }

  handleClear() {

    let board = JSON.parse(JSON.stringify(this.state.board));
    let updated = JSON.parse(JSON.stringify(this.state.updated));

    for (var i = 0; i < this.state.height; i++) {
      for (var j = 0; j < this.state.width; j++) {
        board[i][j] = 0;
        updated[i][j] = 1;
      }
    }

    clearInterval(this.state.interval);

    this.setState({
      "board": board,
      "updated": updated,
      "interval": null,
      "generation": 0,
    }, this.redraw);
  }

  handleGenerate() {
    this.setState({
      "height": this.state.heightToSet,
      "width": this.state.widthToSet,
    }, this.generate);
  }

  handleClick(event) {
    if (!this.state.interval) {
      var canvas = document.getElementById('canvas'),
      x = event.pageX - canvas.offsetLeft,
      y = event.pageY - canvas.offsetTop;

      x = Math.floor(x / 10);
      y = Math.floor(y / 10);

      let board = JSON.parse(JSON.stringify(this.state.board));
      let updated = JSON.parse(JSON.stringify(this.state.updated));

      board[y][x] = board[y][x] === 1 ? 0 : 1;
      updated[y][x] = 1;

      this.setState({
        "board": board,
        "updated": updated,
      }, this.redraw);
    }
  }

  handleSettings() {
    this.setState({
      "showSettings": this.state.showSettings ? null : 1,
    });
  }

  generate() {
    let board = [];
    let updated = [];

    for (let i = 0; i < this.state.height; i++) {
        const row = [];
        const updateRow = [];
        for (let j = 0; j < this.state.width; j++) {
            const cell = Math.random() > 0.85 ? 1 : 0;
            row.push(cell);
            updateRow.push(1);
        }
        board.push(row);
        updated.push(updateRow);
    }

    this.setState({
      "board": board,
      "updated": updated,
      "generation": 0,
    }, this.redraw);
  }

  render() {
    return (
      <Board
        width={this.state.width}
        height={this.state.height}
        interval={this.state.interval}
        speed={this.state.speed}
        generation={this.state.generation}
        widthToSet={this.state.widthToSet}
        heightToSet={this.state.heightToSet}
        showSettings={this.state.showSettings}
        onClick={this.handleClick}
        onPause={this.handlePause}
        onClear={this.handleClear}
        onGenerate={this.handleGenerate}
        onHeightUpdate={this.handleHeightUpdate}
        onWidthUpdate={this.handleWidthUpdate}
        onSpeedUpdate={this.handleSpeedUpdate}
        onSettings={this.handleSettings}/>
    );
  }
}

export default BoardContainer;
