import React, { useMemo, useState, useEffect } from 'react';
import './App.css';
import Cell, { ICell } from './components/Cell';
import {
  getAllConnectedAreas,
  getIndexInGrid,
  generateGrid
} from './utils/utils';

function App() {
  const [size, setSize] = useState(5);
  const [cells, setCells] = useState<ICell[]>([]);

  const grid = useMemo(() => generateGrid(size), [size]);

  const connectedAreaSets = useMemo(() => getAllConnectedAreas(grid), [grid]);

  useEffect(() => {
    const cells: ICell[] = [];

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        const value = grid[row][col];
        const index = getIndexInGrid(grid.length, row, col);
        cells.push({
          isHovered: false,
          index,
          value
        });
      }
    }

    setCells(cells);
  }, [grid]);

  function handleCellHover(cellIndex: number) {
    let currentSet: Set<number> = new Set();

    // Find the set the hovered cell belongs to
    for (const set of connectedAreaSets) {
      if (set.has(cellIndex)) {
        currentSet = set;
        break;
      }
    }

    // highlight all cells in that set
    setCells(cells =>
      cells.map(cell => {
        return {
          ...cell,
          isHovered: currentSet.has(cell.index)
        };
      })
    );
  }

  return (
    <div className="container">
      <div className="grid">
        {cells.map(cell => (
          <Cell key={cell.index} cell={cell} onHover={handleCellHover} />
        ))}
      </div>
    </div>
  );
}

export default App;
