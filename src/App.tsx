import React, { useMemo, useState, useEffect, useRef } from 'react';
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
  const currentSet = useRef<Set<number>>(new Set());

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
          value,
          text: ''
        });
      }
    }

    setCells(cells);
  }, [grid]);

  function handleCellHover(cellIndex: number) {
    currentSet.current = new Set();
    // Find the set the hovered cell belongs to
    for (const set of connectedAreaSets) {
      if (set.has(cellIndex)) {
        currentSet.current = set;
        break;
      }
    }

    // highlight all cells in that set
    setCells(cells =>
      cells.map(cell => ({
        ...cell,
        isHovered: currentSet.current.has(cell.index)
      }))
    );
  }

  function handleCellClick(cellIndex: number) {
    setCells(cells =>
      cells.map(cell => ({
        ...cell,
        text: cell.index === cellIndex ? currentSet.current.size.toString() : ''
      }))
    );
  }

  return (
    <div className="container">
      <div className="grid" onMouseLeave={() => handleCellHover(-1)}>
        {cells.map(cell => (
          <Cell
            key={cell.index}
            cell={cell}
            onHover={handleCellHover}
            onClick={handleCellClick}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
