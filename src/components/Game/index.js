import React from 'react';
import Board from '../Board';
import Square from '../Square';
import HistoryStep from '../History';

export default class Game extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      board: Array(9).fill(null),
      currentStep: 1,
      stepValue: 'X',
      xIsNext: false,
      isGameOver: false,
    }
  }

  // Square methods
  renderSquare = id => {
    return(
      <Square 
        value={this.state.board[id]} 
        onClick={() => this.handleSquareClick(id)}
      />
    );
  }
  
  handleSquareClick = id => {
    const { board, isGameOver } = this.state;

    if (!isGameOver) {
      this.makeMove(board, id);
      if (this.calculateWinner(board)) {
        this.endGame()
      }
    } else return;
  }

  // History methods
  renderHistoryStep = id => {
    return(
      <HistoryStep
        value={id} 
        onClick={() => this.handleHistoryClick(id)}
      />
    );
  }

  handleHistoryClick = id => {
    const { history } = this.state;

    this.setState(history[id]);
  }

  // Other methods
  getStatus = () =>  {
    const { isGameOver, stepValue } = this.state;

    return `${isGameOver ? 'The winner is: ' : 'Current turn: '} ${stepValue}`;
  }

  makeMove = (board, id) => {
    const { stepValue, xIsNext, history } = this.state;
    let { currentStep } = this.state;
    let historyStep = [...history];
    let boardValue = [...board];
    
    if(!board[id]) {
      boardValue[id] = stepValue;
      historyStep.push(this.state);
      currentStep++;
      this.setState({
        history: historyStep,
        board: boardValue,
        currentStep: currentStep,
        stepValue: xIsNext ? 'X' : 'O',
        xIsNext: !xIsNext,
        isGameOver: false,
      });
    } else return null;
  }
  
  calculateWinner = board => {
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
  
  endGame = () => {
    const { history, board, currentStep, stepValue } = this.state;

    this.setState({
      history: history,
      board: board,
      currentStep: currentStep,
      stepValue: stepValue,
      xIsNext: null,
      isGameOver: true,
    });
  }

  render() {
    const { currentStep } = this.state;
    
    return (
      <div className="game-container">
        <div className="game-status">
          {this.getStatus()}
        </div>
        <div className="game">
          <Board renderSquare={this.renderSquare} />
          <ul className="game-history">
            {[...Array(currentStep).keys()].map(id => this.renderHistoryStep(id))}
          </ul>
        </div>
      </div>
    );
  }
}