import React, { useEffect, useState } from "react";

export const EndGameDialog = ({
  step,
  previousName,
  onSetName,
  onAddEntry,
  onCancel,
}) => {
  const [name, setName] = useState(previousName);

  const handleInput = (event) => {
    setName(event.target.value.trim());
  };

  useEffect(() => {
    onSetName(name);
  }, [name, onSetName]);

  return (
    <div className="overlay">
      <div className="dialog">
        <button
          className="close-button"
          id="end-game-dialog-submit"
          onClick={onCancel}
        >
          X
        </button>
        <form onSubmit={onAddEntry}>
          <h2 className="header">Wrong tile!</h2>
          {step > 0 && (
            <>
              <span>
                You got to step <strong>{step}</strong>
              </span>
              <input
                id="end-game-dialog-input"
                className="input"
                value={name}
                onChange={handleInput}
                placeholder="Write your name"
                autoFocus
              ></input>
            </>
          )}
          <button
            id="end-game-dialog-submit"
            className="button"
            disabled={(!name || name.length === 0) && step > 0}
            type="submit"
          >
            Accept
          </button>
        </form>
      </div>
    </div>
  );
};
