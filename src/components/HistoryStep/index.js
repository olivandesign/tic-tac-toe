import React from 'react';

export default function HistoryStep(props) {
  return (
    <li className="history-step" onClick={props.onClick}>
      Step {props.value}
    </li>
  );
}