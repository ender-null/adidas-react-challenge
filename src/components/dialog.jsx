import React, { useState } from "react";

export const Dialog = ({ round, ranking, onSubmit }) => {
  const [name, setName] = useState("");

  const handleInput = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    ranking.push({ name, round });
    localStorage.setItem("ranking", JSON.stringify(ranking));
    onSubmit();
  };

  return (
    <div className="overlay">
      <div className="dialog">
        <form onSubmit={handleSubmit}>
          <h2 className="header">Wrong tile!</h2>
          <input
            className="input"
            onChange={handleInput}
            placeholder="Write your name"
            autoFocus
          ></input>
          <button className="button" disabled={name.length === 0} type="submit">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};
