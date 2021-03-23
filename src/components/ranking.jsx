import React from "react";

export const Ranking = ({ ranking, onNewGame }) => {
  const orderedRanking = Object.entries(ranking);
  orderedRanking.sort(([, stepA], [, stepB]) => {
    return stepB - stepA;
  });

  return (
    <div className="ranking">
      <h1 className="header">Hall of fame</h1>
      <ol>
        {orderedRanking.map(([name, step], index) => {
          return (
            <li key={index}>
              <strong>{name}</strong> {step}
            </li>
          );
        })}
      </ol>
      <button className="button" onClick={onNewGame}>
        New game
      </button>
    </div>
  );
};
