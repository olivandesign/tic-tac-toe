import React from 'react';
import Square from '../Square';

export default class Game extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      squares: [...Array(9).fill(null)],
      currentStep: 'X',
      xIsNext: false,
    }
  }

  handleSquareClick = id => {
    const { squares, currentStep, xIsNext } = this.state;
    
    if (this.calculateWinner(squares) || squares[id]) {
      return null;
    } else {
      let newSquares = [...squares];
      newSquares[id] = currentStep;
      this.setState({
        history: [],
        squares: newSquares,
        currentStep: xIsNext ? 'X' : 'O',
        xIsNext: !xIsNext,
      });
    }
  }

  calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  render() {
    const { squares, currentStep } = this.state;
    const winner = this.calculateWinner(squares);
    
    return (
      <div className="game-container">
        <div className="game-status">
          {winner ? `The winner: ${winner}`: `Current move: ${currentStep}`}
        </div>
        <div className="game">
          <div className="board">
            {squares.map((value, id) => (
              <Square 
                key={id}
                value={value} 
                onClick={() => this.handleSquareClick(id)}
              />
            ))}
          </div>
          <ul className="game-history">
          </ul>
        </div>
      </div>
    );
  }
}




  // makeMove = (board, id) => {
  //   const { stepValue, xIsNext, history } = this.state;
  //   let { currentStep } = this.state;
  //   let historyStep = [...history];
  //   let boardValue = [...board];
    
  //   if(!board[id]) {
  //     boardValue[id] = stepValue;
  //     historyStep.push(this.state);
  //     currentStep++;
  //     this.setState({
  //       history: historyStep,
  //       board: boardValue,
  //       currentStep: currentStep,
  //       stepValue: xIsNext ? 'X' : 'O',
  //       xIsNext: !xIsNext,
  //       isGameOver: false,
  //     });
  //   } else return null;
  // }
    
  // 