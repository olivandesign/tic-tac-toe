import React from 'react';
import Board from '../Board';
import Square from '../Square';

const initialState = {
  board: Array(9).fill(null),
  currentTurn: 'X',
  xIsNext: false,
  isGameOver: false,
}

export default class Game extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  renderSquare = i => {
    return(
      <Square 
        value={this.state.board[i]} 
        onClick={() => this.handleSquareClick(i)}
      />
    );
  }

  getStatus = () =>  {
    const { isGameOver, currentTurn } = this.state;

    return `${isGameOver ? 'The winner is: ' : 'Current turn: '} ${currentTurn}`;
  }

  handleSquareClick = i => {
    const { board, isGameOver } = this.state;

    if (!isGameOver) {
      this.makeMove(board, i);
      if (this.calculateWinner(board)) {
        this.setGameOver()
      }
    } else return;
  }

  handleResetClick = () => {
    this.setState(initialState);
  }

  setGameOver = () => {
    const { board, currentTurn } = this.state;

    this.setState({
      board: board,
      currentTurn: currentTurn,
      xIsNext: null,
      isGameOver: true,
    });
  }

  makeMove = (board, i) => {
    const { currentTurn, xIsNext} = this.state;
    
    if(!board[i]) {
      board[i] = currentTurn;
      this.setState({
        board: board,
        currentTurn: xIsNext ? 'X' : 'O',
        xIsNext: !xIsNext,
        isGameOver: false,
      });
    } else return;
  }

  calculateWinner = (board) => {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <div className="game-container">
        <h1 className="game-status">{this.getStatus()}</h1>
        <div className="game">
          <Board renderSquare={this.renderSquare} />
          <div className="game-controls">
            <button className="reset-button" onClick={this.handleResetClick}>Reset</button>
            <div className="game-history">Step 1</div>
          </div>
        </div>
      </div>
    );
  }
}