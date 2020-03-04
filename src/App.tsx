import React, { useMemo, useState, useEffect } from 'react';
import './App.css';
import Cell from './components/Cell';
import { getRandom, getAllConnectedAreas, getIndexInGrid } from './utils/utils';

function App() {
  const [size, setSize] = useState(5);

  function generateRandomData(size: number) {
    const grid: number[][] = [];
    for (let row = 0; row < size; row++) {
      grid[row] = [];
      for (let col = 0; col < size; col++) {
        grid[row][col] = getRandom(0, 1);
      }
    }

    console.log(grid);
    return grid;
  }

  const grid = useMemo(() => generateRandomData(size), [size]);

  useEffect(() => {
    console.log(getAllConnectedAreas(grid));
  }, [grid]);

  function renderCells() {
    const cells: JSX.Element[] = [];

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        const random = grid[row][col];
        const index = getIndexInGrid(size, row, col);
        cells.push(<Cell key={index} value={random} order={index} />);
      }
    }
    return cells;
  }

  return (
    <div className="container">
      <div className="grid">{renderCells()}</div>
    </div>
  );
}

export default App;
