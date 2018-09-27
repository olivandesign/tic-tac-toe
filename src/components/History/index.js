import React from 'react';

export default function History(props) {
  return (
    <ol className="game-history">
      {[...Array(props.currentStep).keys()].map(id => <li>{props.renderHistoryStep(id)}</li>)}
    </div>
  );
}