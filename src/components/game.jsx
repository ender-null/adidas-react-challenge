import React, { useEffect, useState } from "react";
import { Board } from "./board.jsx";
import { Dialog } from "./dialog.jsx";
import { Ranking } from "./ranking.jsx";

export const Game = () => {
  const [name, setName] = useState('');
  const [step, setStep] = useState(Number(localStorage.getItem("step")) || 0);
  const [ranking, setRanking] = useState(JSON.parse(localStorage.getItem("ranking")) || []);
  const [showDialog, setShowDialog] = useState(false);

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
      const newRanking = [...ranking];
      newRanking.push({ name, step });
      newRanking.sort((a, b) => {
        return b.step - a.step;
      })
      setRanking(newRanking.slice(0, 10));
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
  }

  useEffect(() => {
    localStorage.setItem("step", step);
  }, [step]);

  useEffect(() => {
    localStorage.setItem("ranking", JSON.stringify(ranking));
  }, [ranking]);

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
      {showDialog && (<Dialog onSetName={setName} previousName={name} step={step} onAddEntry={handleAddEntry} onCancel={handleCancel}></Dialog>)}
    </div>
  );
};
