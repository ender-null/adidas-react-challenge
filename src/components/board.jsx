import React, { useEffect, useState } from "react";
import { Tile } from "./tile.jsx";

const BoardWidth = 320;

export const Board = ({ step, onSuccess, onFail }) => {
  const [tiles, setTiles] = useState(null);

  const getSize = () => step + 2;

  const createTile = (differentTileIndex, color) => (_, index) => {
    const isDifferent = index === differentTileIndex;
    const style = {
      background: `hsl(${color}, 60%, ${isDifferent ? 65 : 50}%)`,
      width: `calc(100% / ${getSize()} - 4px)`,
      height: `calc(100% / ${getSize()} - 4px)`,
    };

    return (
      <Tile
        key={index}
        style={style}
        onClick={isDifferent ? onSuccess : onFail}
      />
    );
  };

  function createTiles() {
    const size = getSize();
    const totalSize = size * size;
    const highlightTile = Math.floor(Math.random() * totalSize);
    const color = Math.floor(Math.random() * 256);
    const newTiles = Array(totalSize)
      .fill(null)
      .map(createTile(highlightTile, color));
    setTiles(newTiles);
  }

  useEffect(() => {
    createTiles();
  }, [step]);

  return (
    <div className="board">
      <div className="header">
        Step: <strong>{step}</strong>
      </div>
      <div
        className="tiles"
        style={{ width: `${BoardWidth}px`, height: `${BoardWidth}px` }}
      >
        {tiles}
      </div>
    </div>
  );
};
