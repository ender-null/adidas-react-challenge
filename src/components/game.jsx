import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Board } from "./board.jsx";
import { Dialog } from "./dialog.jsx";
import { Ranking } from "./ranking.jsx";

export const Game = () => {
  const savedRound = Number(localStorage.getItem("round"));
  const savedRanking = JSON.parse(localStorage.getItem("ranking"));
  const [title, setTitle] = useState(null);
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
    setTitle(`React Challenge: Game over`);
  };

  useEffect(() => {
    if (round >= 0) {
      setTitle(`React Challenge: Round ${round}`);
    } else {
      setTitle(`React Challenge`);
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
      <Helmet>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Helmet>
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
