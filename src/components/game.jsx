import React, { useEffect, useState } from "react";
import { Board } from "./board.jsx";

export const Game = () => {
  const savedRound = Number(localStorage.getItem("round"));
  const savedRanking = JSON.parse(localStorage.getItem("ranking"));
  const [round, setRound] = useState(savedRound || 0);
  const [ranking, setRanking] = useState(savedRanking || []);

  const handleSuccess = () => {
    setRound(round + 1);
  };

  const handleFail = () => {
    ranking.push({
      name: "TODO",
      round: round,
    });
    localStorage.setItem("ranking", JSON.stringify(ranking));
    setRound(0);
  };

  useEffect(() => {
    document.title = `React Challenge: Round ${round}`;
    localStorage.setItem("round", round);
  }, [round]);

  return (
    <div className="game">
      <Board round={round} onSuccess={handleSuccess} onFail={handleFail} />
    </div>
  );
};
