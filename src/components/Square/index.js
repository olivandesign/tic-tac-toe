import React from 'react';

export default function Square({ value, onClick }) {
  return(
    <div className="square" onClick={onClick}>
      <div className="square-content">{value}</div>
    </div>
  );
}