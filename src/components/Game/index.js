import React from 'react';
import Square from '../Square';
import HistoryStep from '../HistoryStep';

export default class Game extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = this.setNewGame();
  }

  createBoardDimension = num => {
    return [...Array(num)].map(row => Array(num).fill(null));
  }

  setNewGame = () => {
    return ({
      boardSize: null,
      history: null,
      boardDimension: null,
      currentStepValue: null,
      xIsNext: null,
      winner: null,
    });
  }

  setNextStep = (rowId, columnId) => {
    const { xIsNext } = this.state;
    const winner = this.calculateWinner(rowId,columnId);

    this.setState({
      currentStepValue: xIsNext ? 'X' : 'O',
      xIsNext: !xIsNext,
      winner: winner ? winner : null,
    });

    return null;
  }

  calculateWinner = (rowId, columnId) => {
    const { boardSize, boardDimension } = this.state;
    const row = boardDimension[rowId];
    const column = [];
    const diagonalLeftToRight = [];
    const diagonalRightToLeft = [];

    for (let i = 0; i < boardSize; i++ ) {
      column.push(boardDimension[i][columnId]);
      diagonalLeftToRight.push(boardDimension[i][i]);
      diagonalRightToLeft.push(boardDimension[i][(boardSize - 1) - i]);
    }

    return (this.checkLine(row) || 
            this.checkLine(column) || 
            this.checkLine(diagonalLeftToRight) ||
            this.checkLine(diagonalRightToLeft));
  }

  checkLine = line => {
    const { boardDimension } = this.state;

    if (line.length === boardDimension.length) {
      return line.reduce((a, b) => a === b ? b : null);
    }
  }

  getGridStyle = (boardSize, type) => {
    const ratio = Math.round(30 / boardSize);
    const rowOrColumn = type.charAt(0).toUpperCase() + type.slice(1);
    const gridStyle = `gridTemplate${rowOrColumn}s:repeat(${boardSize} , ${ratio}vw)`.split(':');
    
    return {
      [gridStyle[0]]: `${gridStyle[1]}`
    }
  }

  handleSelectChange = ({ target: {value} }) => {
    const boardSize = parseInt(value, 10);
    
    this.setState({
      boardSize: boardSize,
      history: [],
      boardDimension: this.createBoardDimension(boardSize),
      currentStepValue: 'X',
      xIsNext: false,
      winner: null,
    });
  }

  handleSquareClick = (rowId, columnId) => {
    const { history, boardDimension, currentStepValue, winner } = this.state;
    const newHistory = [...history];
    const newboardDimension = boardDimension.map(row => [...row]);
    const isSquareFilled = boardDimension[rowId][columnId];

    if (!(isSquareFilled || winner)) {
      newboardDimension[rowId][columnId] = currentStepValue;
      newHistory.push(this.state);
      this.setState({
        history: newHistory,
        boardDimension: newboardDimension,
      }, () => {
        this.setNextStep(rowId, columnId)
      });
    }
    return null;
  }

  handleHistoryClick = id => {
    this.setState(prevState => prevState.history[id]);
  }

  handleResetClick = () => {
    this.setState(this.setNewGame());
  }

  renderBoardGame = () => {
    const { boardSize, history, boardDimension, currentStepValue, winner } = this.state;
    const boardGrid = this.getGridStyle(boardSize, 'row');
    const rowGrid = this.getGridStyle(boardSize, 'column');

    return (
      <div className="game-container">
        <div className="game-status">
          {winner ? `${winner} is the winner!`: `Current move: ${currentStepValue}`}
        </div>
        <div className="game">
          <div className="board" style={boardGrid}>
            {boardDimension.map((row, rowId)  => (
              <div key={rowId} className="row" style={rowGrid}>
                {row.map((value, columnId) => (
                  <Square
                    key={columnId}
                    value={value} 
                    onClick={() => this.handleSquareClick(rowId, columnId)}
                  />
                ))}
              </div>
            ))}
          </div>
          <ul className="game-history">
            <button className="reset-button" onClick={this.handleResetClick}>
              Reset
            </button>
            {history.map((value, id) => (
                <HistoryStep
                  key={id}
                  stepNumber={id}
                  onClick={() => this.handleHistoryClick(id)}
                />
              ))}
          </ul>
        </div>
      </div>
    );
  }

  renderStartScreen = () => {
    return (
      <div className="game-container">
        <div className="start-screen">
          <div className="game-status">Start new game</div>
          <div>
            <select name="board-select" onChange={this.handleSelectChange} defaultValue="Choose board size">
              <option disabled>Choose board size</option>
              <option value="3">Board 3x3</option>
              <option value="4">Board 4x4</option>
              <option value="5">Board 5x5</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this.state.boardSize ? this.renderBoardGame() : this.renderStartScreen();
  }
}