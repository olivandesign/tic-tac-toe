import React from 'react';
import Board from '../Board';
import Square from '../Square';

export default class Game extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      history: {},
      board: Array(9).fill(null),
      currentStep: 1,
      stepValue: 'X',
      xIsNext: false,
      isGameOver: false,
    }
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
    const { isGameOver, stepValue } = this.state;

    return `${isGameOver ? 'The winner is: ' : 'Current turn: '} ${stepValue}`;
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

  setGameOver = () => {
    const { board, stepValue } = this.state;

    this.setState({
      board: board,
      stepValue: stepValue,
      xIsNext: null,
      isGameOver: true,
    });
  }

  makeMove = (board, i) => {
    const { stepValue, xIsNext, history, currentStep } = this.state;
    
    if(!board[i]) {
      board[i] = stepValue;
      history[currentStep] = board;
      this.setState({
        history: history,
        board: board,
        currentStep: currentStep++,
        stepValue: xIsNext ? 'X' : 'O',
        xIsNext: !xIsNext,
        isGameOver: false,
      });
    } else return;
  }

  getHistory = () => {
    const { history, currentStep } = this.state;
    
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
        <div className="game-status">
          {this.getStatus()}
        </div>
        <div className="game">
          <Board renderSquare={this.renderSquare} />
          <div className="game-history">
            {this.getHistory()}
          </div>
        </div>
      </div>
    );
  }
}