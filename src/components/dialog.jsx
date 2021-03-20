import React, { useEffect, useState } from "react";

export const Dialog = ({
  step,
  previousName,
  onSetName,
  onAddEntry,
  onCancel,
}) => {
  const [name, setName] = useState(previousName);

  const handleInput = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    onSetName(name);
  }, [name]);

  return (
    <div className="overlay">
      <div className="dialog">
        <button className="close-button" onClick={onCancel}>
          X
        </button>
        <form onSubmit={onAddEntry}>
          <h2 className="header">Wrong tile!</h2>
          {step > 0 && (
            <span>
              You got to step <strong>{step}</strong>
            </span>
          )}
          {step > 0 && (
            <input
              className="input"
              value={name}
              onChange={handleInput}
              placeholder="Write your name"
              autoFocus
            ></input>
          )}
          <button
            className="button"
            disabled={name.length === 0 && step > 0}
            type="submit"
          >
            Accept
          </button>
        </form>
      </div>
    </div>
  );
};
