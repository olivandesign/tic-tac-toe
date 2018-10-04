import React from 'react';

export default function HistoryStep({ stepNumber, onClick }) {
  return (
    <li className="history-step" onClick={onClick}>
      To step {stepNumber}
    </li>
  );
}