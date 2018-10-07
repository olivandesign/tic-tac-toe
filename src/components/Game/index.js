import React from 'react';
import Square from '../Square';
import HistoryStep from '../HistoryStep';

const boardSize = 3;

function createBoardDimension(num) {
  return [...Array(num)].map(row => Array(num).fill(null));
}

export default class Game extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      boardDimension: createBoardDimension(boardSize),
      currentStepValue: 'X',
      xIsNext: false,
      winner: null,
    };
  }

  handleSquareClick = (rowId, columnId) => {
    const { history, boardDimension, currentStepValue, xIsNext, winner } = this.state;
    const newHistory = [...history];
    const newboardDimension = [...boardDimension].map(row => [...row]);
    const isSquareFilled = boardDimension[rowId][columnId];

    if (!(isSquareFilled || winner)) {
      newboardDimension[rowId][columnId] = currentStepValue;
      newHistory.push(this.state);
      this.setState({
        history: newHistory,
        boardDimension: newboardDimension,
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
    const { history, boardDimension, xIsNext } = this.state;
    const winner = this.calculateWinner(rowId,columnId);

    this.setState({
      history: history,
      boardDimension: boardDimension,
      currentStepValue: xIsNext ? 'X' : 'O',
      xIsNext: !xIsNext,
      winner: winner ? winner : null,
    });

    return null;
  }

  calculateWinner = (rowId, columnId) => {
    const { boardDimension } = this.state;
    const row = boardDimension[rowId];
    const column = [];
    const diagonalLeft = [];
    const diagonalRight = [];

    for (let i = 0; i < boardSize; i++ ) {
      column.push(boardDimension[i][columnId]);
      diagonalLeft.push(boardDimension[i][i]);
      diagonalRight.push(boardDimension[i][(boardSize - 1) - i]);
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
  }

  handleHistoryClick = id => {
    this.setState(prevState => prevState.history[id]);
  }

  render() {
    const { history, boardDimension, currentStepValue, winner } = this.state;
    
    return (
      <div className="game-container">
        <div className="game-status">
          {winner ? `${winner} is the winner!`: `Current move: ${currentStepValue}`}
        </div>
        <div className="game">
          <div className="board">
            {boardDimension.map((row, rowId)  => (
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