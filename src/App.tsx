import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';

import './App.css';
import Cell, { ICell } from './components/Cell/Cell';
import {
  getAllConnectedAreas,
  getIndexInGrid,
  generateGrid,
  lightenDarkenColor
} from './utils/utils';
import Slider from './components/Slider/Slider';
import ColorPicker from './components/ColorPicker/ColorPicker';

function App() {
  const [size, setSize] = useState(5);
  const [cells, setCells] = useState<ICell[]>([]);

  const [cellColor, setCellColor] = useState('#FF8A65');

  // Track the set the current hovered cell belongs to
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

  const memoHandleCellHover = useCallback(handleCellHover, [size]);

  function handleCellClick(cellIndex: number) {
    setCells(cells =>
      cells.map(cell => ({
        ...cell,
        text: cell.index === cellIndex ? currentSet.current.size.toString() : ''
      }))
    );
  }

  const memoHandleCellClick = useCallback(handleCellClick, [size]);

  return (
    <div className="container">
      <div
        className="page-content"
        style={
          {
            '--cell-color': cellColor,
            '--cell-color-bright': lightenDarkenColor(cellColor, 20),
            '--grid-size': size
          } as React.CSSProperties
        }
      >
        <div>
          <Slider onUpdateSize={setSize} />

          <ColorPicker onColorChanged={setCellColor} color={cellColor} />
        </div>
        <div className="grid" onMouseLeave={() => handleCellHover(-1)}>
          {cells.map(cell => (
            <Cell
              key={cell.index}
              cell={cell}
              onHover={memoHandleCellHover}
              onClick={memoHandleCellClick}
              gridSize={size}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
