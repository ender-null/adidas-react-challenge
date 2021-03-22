import React, { useEffect, useState } from "react";
import { Board } from "./board.jsx";
import { EndGameDialog } from "./end-game-dialog.jsx";
import { Ranking } from "./ranking.jsx";

export const Game = () => {
  const [name, setName] = useState("");
  const [step, setStep] = useState(Number(localStorage.getItem("step")) || 0);
  const [ranking, setRanking] = useState(
    JSON.parse(localStorage.getItem("ranking")) || {}
  );
  const [showDialog, setShowDialog] = useState(
    localStorage.getItem("show_dialog")
  );

  const handleSuccess = () => {
    setStep(step + 1);
  };

  const handleFail = () => {
    setShowDialog(true);
  };

  const handleNewGame = () => {
    setStep(0);
  };

  const handleAddEntry = () => {
    if (step > 0) {
      setRanking({
        ...ranking,
        [name]: ranking[name] && ranking[name] > step ? ranking[name] : step,
      });
      setStep(-1);
    }
    setShowDialog(false);
  };

  const handleCancel = () => {
    if (step > 0 && ranking.length > 0) {
      setStep(-1);
    } else {
      setStep(0);
    }
    setShowDialog(false);
  };

  useEffect(() => {
    localStorage.setItem("step", step);
  }, [step]);

  useEffect(() => {
    localStorage.setItem("ranking", JSON.stringify(ranking));
  }, [ranking]);

  useEffect(() => {
    localStorage.setItem("show_dialog", showDialog);
  }, [showDialog]);

  if (step < 0) {
    return (
      <div className="game">
        <Ranking ranking={ranking} onNewGame={handleNewGame}></Ranking>
      </div>
    );
  }

  return (
    <div className="game">
      <Board step={step} onSuccess={handleSuccess} onFail={handleFail} />
      {showDialog && (
        <EndGameDialog
          onSetName={setName}
          previousName={name}
          step={step}
          onAddEntry={handleAddEntry}
          onCancel={handleCancel}
        ></EndGameDialog>
      )}
    </div>
  );
};
