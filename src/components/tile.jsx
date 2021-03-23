import React from "react";

export const Tile = ({ style, onClick, isDifferent }) => {
  return (
    <div
      className={isDifferent ? "tile different" : "tile"}
      style={style}
      onClick={onClick}
    ></div>
  );
};
