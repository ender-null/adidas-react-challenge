import React, { useEffect, useState } from "react";
import { Board } from "./board.jsx";
import { Dialog } from "./dialog.jsx";
import { Ranking } from "./ranking.jsx";

export const Game = () => {
  const savedRound = Number(localStorage.getItem("round"));
  const savedRanking = JSON.parse(localStorage.getItem("ranking"));
  const [round, setRound] = useState(savedRound || 0);
  const [ranking, setRanking] = useState(savedRanking || []);
  const [dialog, setDialog] = useState(false);

  const handleNewGame = () => {
    setRound(0);
  };

  const handleAddEntry = () => {
    setDialog(false);
    setRound(-1);
  };

  const handleSuccess = () => {
    setRound(round + 1);
  };

  const handleFail = () => {
    setDialog(true);
  };

  useEffect(() => {
    if (round >= 0) {
      document.title = `React Challenge: Round ${round}`;
    } else {
      document.title = `React Challenge`;
    }
    localStorage.setItem("round", round);
  }, [round]);

  if (round < 0) {
    return (
      <div className="game">
        <Ranking ranking={ranking} onNewGame={handleNewGame}></Ranking>
      </div>
    );
  }

  return (
    <div className="game">
      <Board round={round} onSuccess={handleSuccess} onFail={handleFail} />
      {dialog && (
        <Dialog
          ranking={ranking}
          round={round}
          onSubmit={handleAddEntry}
        ></Dialog>
      )}
    </div>
  );
};
