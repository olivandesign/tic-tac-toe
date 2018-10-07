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
    };
  }

  handleSquareClick = (rowId, columnId) => {
    const { history, squares, currentStepValue, xIsNext, winner } = this.state;
    const newHistory = [...history];
    const newSquares = [...squares].map(row => [...row]);
    const isSquareFilled = squares[rowId][columnId];

    if (!(isSquareFilled || winner)) {
      newSquares[rowId][columnId] = currentStepValue;
      newHistory.push(this.state);
      this.setState({
        history: newHistory,
        squares: newSquares,
        currentStepValue: currentStepValue,
        xIsNext: xIsNext,
        winner: winner,
      }, () => {
        this.setNextStep(rowId, columnId)
      });
    }
    return null;
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
    });

    return null;
  }

  calculateWinner = (rowId, columnId) => {
    const { squares } = this.state;
    const row = this.state.squares[rowId];
    const column = [];
    const diagonalLeft = [];
    const diagonalRight = [];

    for (let i = 0; i < boardSize; i++ ) {
      column.push(squares[i][columnId]);
      diagonalLeft.push(squares[i][i]);
      diagonalRight.push(squares[i][(boardSize - 1) - i]);
    }

    return (this.checkLine(row) || 
            this.checkLine(column) || 
            this.checkLine(diagonalLeft) ||
            this.checkLine(diagonalRight));
  }

  checkLine = line => {
    if (line.length > 0) {
      return line.reduce((a, b) => a === b ? b : null);
    }
    return null;
  }

  handleHistoryClick = id => {
    this.setState(prevState => prevState.history[id]);
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