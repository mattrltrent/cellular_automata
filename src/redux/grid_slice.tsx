import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Cell {
  isAlive: boolean;
}

export interface GridState {
  data: Cell[][];
}

const initialState: GridState = {
  data: [],
};

const countNeighbors = (grid: Cell[][], x: number, y: number): number => {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  return directions.reduce((acc, [dx, dy]) => {
    const newX = x + dx,
      newY = y + dy;
    if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length) {
      acc += grid[newX][newY].isAlive ? 1 : 0;
    }
    return acc;
  }, 0);
};

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    initGrid: (
      state,
      action: PayloadAction<{ rows: number; columns: number }>
    ) => {
      const { rows, columns } = action.payload;
      state.data = Array.from({ length: rows }, () =>
        Array.from({ length: columns }, () => ({ isAlive: false }))
      );
    },
    updateCellState: (
      state,
      action: PayloadAction<{ rowIndex: number; columnIndex: number }>
    ) => {
      const { rowIndex, columnIndex } = action.payload;
      if (state.data[rowIndex] && state.data[rowIndex][columnIndex]) {
        const cell = state.data[rowIndex][columnIndex];
        cell.isAlive = !cell.isAlive;
      }
    },
    populateGridRandomly: (state) => {
      state.data = state.data.map((row) =>
        row.map(() => ({ isAlive: Math.random() > 0.88 }))
      );
    },
    clearGrid: (state) => {
      state.data = state.data.map((row) => row.map(() => ({ isAlive: false })));
    },
    tick: (state) => {
      const nextGrid = state.data.map((row, rowIndex) =>
        row.map((cell, columnIndex) => {
          const aliveNeighbors = countNeighbors(
            state.data,
            rowIndex,
            columnIndex
          );
          const remainsAlive = cell.isAlive
            ? aliveNeighbors === 2 || aliveNeighbors === 3
            : aliveNeighbors === 3;
          return { isAlive: remainsAlive };
        })
      );
      state.data = nextGrid;
    },
  },
});

export const {
  initGrid,
  updateCellState,
  tick,
  populateGridRandomly,
  clearGrid,
} = gridSlice.actions;

export default gridSlice.reducer;
