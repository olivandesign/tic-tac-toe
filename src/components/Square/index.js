import React from 'react';

export default function Square({ value, onClick }) {
  return(
    <div className="square" onClick={onClick}>
      {value}
    </div>
  );
}
