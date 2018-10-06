import React from 'react';
import Square from '../Square';
import HistoryStep from '../HistoryStep';

const boardSize = 3;

function createSquares(num) {
  return [...Array(num)].map(row => Array(num).fill(null));
}

export default class Game extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      squares: createSquares(boardSize),
      currentStepValue: 'X',
      xIsNext: false,
      winner: null,
      isGameOver: false,
    };
  }

  handleSquareClick = (rowId, columnId) => {
    const { history, squares, currentStepValue, xIsNext, winner, isGameOver } = this.state;
    const newHistory = [...history];
    const newSquares = [...squares].map(row => [...row]);
    const isSquareFilled = squares[rowId][columnId];

    if (!(isSquareFilled || isGameOver)) {
      newSquares[rowId][columnId] = currentStepValue;
      newHistory.push(this.state);
      this.setState({
        history: newHistory,
        squares: newSquares,
        currentStepValue: currentStepValue,
        xIsNext: xIsNext,
        winner: winner,
        isGameOver: isGameOver,
      }, () => {
        this.setNextStep(rowId, columnId)
      });
    }
    return null;
  }

  handleHistoryClick = id => {
    this.setState(prevState => prevState.history[id]);
  }

  setNextStep = (rowId, columnId) => {
    const { history, squares, xIsNext } = this.state;
    const winner = this.calculateWinner(rowId,columnId);

    this.setState({
      history: history,
      squares: squares,
      currentStepValue: xIsNext ? 'X' : 'O',
      xIsNext: !xIsNext,
      winner: winner ? winner : null,
      isGameOver: winner ? true : false,
    });

    return null;
  }

  calculateWinner = (rowId, columnId) => {
    return (this.checkRow(rowId) || this.checkColumn(columnId));
  }

  checkRow = rowId => {
    const row = this.state.squares[rowId];
  
    return row.reduce((a, b) => a === b ? b : null);
  }

  checkColumn = columnId => {
    const { squares } = this.state;
    const column = [];

    for (let i = 0; i < boardSize; i++) {
      column.push(squares[i][columnId]);
    }

    return column.reduce((a, b) => a === b ? b : null);
  }

  checkCrosses = (rowId, columnId) => {

  }

  render() {
    const { history, squares, currentStepValue, winner } = this.state;
    
    return (
      <div className="game-container">
        <div className="game-status">
          {winner ? `${winner} is the winner!`: `Current move: ${currentStepValue}`}
        </div>
        <div className="game">
          <div className="board">
            {squares.map((row, rowId)  => (
              row.map((value, columnId) => (
                <Square
                  key={columnId} 
                  value={value} 
                  onClick={() => this.handleSquareClick(rowId, columnId)}
                />
              ))
            ))}
          </div>
          <ul className="game-history">
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
}