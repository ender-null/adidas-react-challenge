import React, { useEffect, useState } from "react";
import { Board } from "./board.jsx";
import { Dialog } from "./dialog.jsx";
import { Ranking } from "./ranking.jsx";

export const Game = () => {
  const savedStep = Number(localStorage.getItem("step"));
  const savedRanking = JSON.parse(localStorage.getItem("ranking"));
  const [step, setStep] = useState(savedStep || 0);
  const [name, setName] = useState('');
  const [ranking, setRanking] = useState(savedRanking || []);
  const [showDialog, setShowDialog] = useState(false);

  const handleSuccess = () => {
    setStep(step + 1);
  };

  const handleFail = () => {
    setShowDialog(true);
    document.title = 'React Challenge: Game over';
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
      localStorage.setItem("ranking", JSON.stringify(ranking));
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
    if (step >= 0) {
      document.title = `React Challenge: Step ${step}`;
    } else {
      document.title = 'React Challenge';
    }
    localStorage.setItem("step", step);
  }, [step]);

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
