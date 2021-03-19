import React from "react";

export const Ranking = ({ ranking, onNewGame }) => {
  return (
    <div className="ranking">
      <h1 className="header">Ranking</h1>
      <ol>
        {ranking.map((entry, index) => {
          return (
            <li key={index}>
              <strong>{entry.name}</strong>: Round {entry.round}
            </li>
          );
        })}
      </ol>
      <button className="button" onClick={onNewGame}>
        New Game
      </button>
    </div>
  );
};
