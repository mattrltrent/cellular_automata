import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initGrid, updateCellState } from "../redux/grid_slice";
import { RootState } from "../redux/store";
import styles from "../styles/Grid.module.css";

const GridComponent = () => {
  const dispatch = useDispatch();
  const grid = useSelector((state: RootState) => state.grid.data);

  // Constants for rows and columns
  const rows = 100; 
  const columns = 100;

  // State for the container size
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    dispatch(initGrid({ rows, columns }));

    const calculateContainerSize = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate the maximum size the grid container can take
      const maxSize = Math.min(viewportWidth, viewportHeight);

      setContainerSize({ width: maxSize, height: maxSize });
    };

    calculateContainerSize();

    // Recalculate when window resizes
    window.addEventListener("resize", calculateContainerSize);

    return () => window.removeEventListener("resize", calculateContainerSize);
  }, [dispatch]);

  const handleCellClick = (rowIndex: number, columnIndex: number) => {
    dispatch(updateCellState({ rowIndex, columnIndex }));
  };

  let timeoutId: NodeJS.Timeout | null = null;

  // call tick until stopped via another call
  function tick() {
    dispatch({ type: "grid/tick" });
    timeoutId = setTimeout(tick, 0.001);
  }

  function cancelTick() { 
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  return (
    <>
      <button onClick={() => dispatch({ type: "grid/populateGridRandomly" })}>Random</button>
      <button onClick={() => tick()}>Tick</button>
      <button onClick={() => cancelTick()}>Stop</button>
      <div 
        className={styles.gridContainer} 
        style={{
          width: `${containerSize.width}px`, 
          height: `${containerSize.height}px`,
        }}
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.gridRow}>
            {row.map((cell, columnIndex) => (
              <div
                key={columnIndex}
                className={`${styles.gridCell} ${cell.isAlive ? styles.alive : styles.dead}`}
                onClick={() => handleCellClick(rowIndex, columnIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default GridComponent;
