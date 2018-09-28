import React from 'react';

export default function Board(props) {
  return (
    <div className="board">
      {[...Array(9).keys()].map(id => props.renderSquare(id))}
    </div>
  );
}