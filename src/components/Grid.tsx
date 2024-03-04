"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initGrid,
  updateCellState,
  tick,
  clearGrid,
  GridState,
  populateGridRandomly,
} from "@/redux/grid_slice";
import styles from "../styles/Grid.module.css";
import Head from "next/head";

// Assuming RootState has a property `grid` for accessing the grid state
interface RootState {
  grid: GridState;
}

const GridComponent = () => {
  const dispatch = useDispatch();
  const grid = useSelector((state: RootState) => state.grid.data);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [loadingGrid, setLoadingGrid] = useState(true);
  const [isDragging, setIsDragging] = useState(false); // Track whether the mouse is being dragged
  const [isSimulating, setIsSimulating] = useState(false); // Track whether the simulation is running
  // State to store fixed dimensions
  const [containerStyle, setContainerStyle] = useState({
    width: "0px",
    height: "0px",
  });

  useEffect(() => {
    const cellSize = 25; // Fixed cell size in pixels
    initializeGrid(cellSize);
  }, [dispatch]);

  const initializeGrid = (cellSize: number) => {
    const viewportWidth = window.innerWidth - 40;
    const viewportHeight = window.innerHeight - 40;
    const columns = Math.floor(viewportWidth / cellSize);
    const rows = Math.floor(viewportHeight / cellSize);

    // Set the fixed dimensions for the grid container
    setContainerStyle({
      width: `${columns * cellSize}px`,
      height: `${rows * cellSize}px`,
    });

    dispatch(initGrid({ rows, columns }));
    randomize();
    setLoadingGrid(false);
  };

  const handleCellClick = (rowIndex: number, columnIndex: number) => {
    dispatch(updateCellState({ rowIndex, columnIndex }));
  };

  const startSimulation = () => {
    setIsSimulating(true);
    if (!intervalId) {
      const id = setInterval(() => {
        dispatch(tick());
      }, 250);
      dispatch(tick());
      setIntervalId(id);
    }
  };

  const stopSimulation = () => {
    setIsSimulating(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const randomize = () => {
    stopSimulation();
    dispatch(populateGridRandomly());
  };


  const clearAndResize = () => {
    stopSimulation();
    initializeGrid(25);
    dispatch(clearGrid());
  };

  const handleMouseDown = (rowIndex: number, columnIndex: number) => {
    setIsDragging(true); // Start dragging
    handleCellToggle(rowIndex, columnIndex);
    // todo: start listener if one doesn't exist for mouse up to say dragging false aka handleMouseUp
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseEnter = (rowIndex: number, columnIndex: number) => {
    if (isDragging) {
      handleCellToggle(rowIndex, columnIndex);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false); // Stop dragging
  };

  const handleCellToggle = (rowIndex: number, columnIndex: number) => {
    dispatch(updateCellState({ rowIndex, columnIndex }));
  };

  return (
    <>
      <Head>
        <title>Conway&apos;s Game of Life</title>
        <meta name="description" content="Conway's Game of Life" />
        <link rel="icon" href="/favicon.ico" />
        {/* icon link */}
      </Head>

      <div className={styles.wrapper}>
        {loadingGrid && <span className={styles.loading}>Doing quick math...</span>}
        <div className={styles.buttons}>
          <button className={styles.button} onClick={() => randomize()}>
            Randomize grid
          </button>
          <button
            className={[
              styles.button,
              isSimulating ? styles.stop : styles.start,
            ].join(" ")}
            onClick={isSimulating ? stopSimulation : startSimulation}
          >
            {isSimulating ? "Stop simulation" : "Start simulation"}
          </button>
          <button className={styles.button} onClick={clearAndResize}>
            Clear + resize
          </button>
        </div>
        <div className={styles.buttonsDown}>
          <button
            className={styles.button}
            onClick={() =>
              window.open(
                "https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
              )
            }
          >
            This is <b>Conway&apos;s Game of Life</b>
          </button>
          <button
            className={styles.button}
            onClick={() =>
              window.open("https://github.com/mattrltrent/cellular_automata")
            }
          >
            ⭐️ on GitHub
          </button>
        </div>
        <div className={styles.gridContainer} style={containerStyle}>
          {!loadingGrid &&
            grid.map((row, rowIndex) => (
              <div key={rowIndex} className={styles.gridRow}>
                {row.map((cell, columnIndex) => (
                  <div
                    // todo: ondragover (aka tap down and "paint over the grid" does handleCellClick)
                    onMouseDown={() => handleMouseDown(rowIndex, columnIndex)}
                    onMouseEnter={() => handleMouseEnter(rowIndex, columnIndex)}
                    key={`${rowIndex}-${columnIndex}`}
                    className={`${styles.gridCell} ${
                      cell.isAlive ? styles.alive : styles.dead
                    }`}
                  ></div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default GridComponent;
