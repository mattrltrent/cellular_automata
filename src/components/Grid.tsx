import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initGrid,
  updateCellState,
  tick,
  GridState,
  populateGridRandomly,
} from "@/redux/grid_slice";
import styles from "../styles/Grid.module.css";

// Assuming RootState has a property `grid` for accessing the grid state
interface RootState {
  grid: GridState;
}

const GridComponent = () => {
  const dispatch = useDispatch();
  const grid = useSelector((state: RootState) => state.grid.data);
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    // Calculate the number of rows and columns based on the viewport size
    const cellSize = 25; // Fixed cell size in pixels
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const columns = Math.floor(viewportWidth / cellSize);
    const rows = Math.floor(viewportHeight / cellSize);

    dispatch(initGrid({ rows, columns }));
  }, [dispatch]);

  const handleCellClick = (rowIndex: number, columnIndex: number) => {
    dispatch(updateCellState({ rowIndex, columnIndex }));
  };

  const startSimulation = () => {
    if (!intervalId) {
      const id = setInterval(() => {
        dispatch(tick());
      }, 250);
      dispatch(tick());
      setIntervalId(id);
    }
  };

  const stopSimulation = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const randomize = () => {
    stopSimulation();
    dispatch(populateGridRandomly());
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => randomize()}>
          shuffle
        </button>
        <button className={styles.button} onClick={startSimulation}>
          start
        </button>
        <button className={styles.button} onClick={stopSimulation}>
          stop
        </button>
      </div>
      <div className={styles.gridContainer}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.gridRow}>
            {row.map((cell, columnIndex) => (
              <div
                key={`${rowIndex}-${columnIndex}`}
                className={`${styles.gridCell} ${
                  cell.isAlive ? styles.alive : styles.dead
                }`}
                onClick={() => handleCellClick(rowIndex, columnIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridComponent;
