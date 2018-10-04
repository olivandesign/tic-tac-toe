import React from 'react';
import Square from '../Square';
import HistoryStep from '../HistoryStep';

export default class Game extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      squares: Array(9).fill(null),
      moveValue: 'X',
      xIsNext: false,
    };
  }

  handleSquareClick = id => {
    const { history, squares, moveValue, xIsNext } = this.state;
    const newHistory = [...history];
    const newSquares = [...squares];
    
    if (this.calculateWinner(squares) || squares[id]) {
      return null;
    } else {
      newSquares[id] = moveValue;
      newHistory.push(this.state);
      this.setState({
        history: newHistory,
        squares: newSquares,
        moveValue: xIsNext ? 'X' : 'O',
        xIsNext: !xIsNext,
      });
    }
  }

  handleHistoryClick = id => {
    this.setState(this.state.history[id]);
  }

  calculateWinner = squares => {
    for (let i = 0; i < squares.length; i++) {
      
    }
    
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
    const { history, squares, moveValue } = this.state;
    const winner = this.calculateWinner(squares);
    
    return (
      <div className="game-container">
        <div className="game-status">
          {winner ? `${winner} is the winner!`: `Current move: ${moveValue}`}
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