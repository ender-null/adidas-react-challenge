import React, { useEffect, useState, useCallback } from "react";
import { Tile } from "./tile.jsx";

const BoardWidth = 320;

export const Board = ({ step, onSuccess, onFail }) => {
  const [tiles, setTiles] = useState(null);

  const getSize = useCallback(() => {return step + 2}, [step]);

  const createTile = useCallback((differentTileIndex, color) => (_, index) => {
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
        isDifferent={isDifferent}
        onClick={isDifferent ? onSuccess : onFail}
      />
    );
  }, [getSize, onSuccess, onFail])

  const createTiles = useCallback(() => {
    const size = getSize();
    const totalSize = size * size;
    const highlightTile = Math.floor(Math.random() * totalSize);
    const color = Math.floor(Math.random() * 256);
    const newTiles = Array(totalSize)
      .fill(null)
      .map(createTile(highlightTile, color));
    setTiles(newTiles);
  },[createTile, getSize])

  useEffect(() => {
    createTiles();
  }, [step, createTiles]);

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
