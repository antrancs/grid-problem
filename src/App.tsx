import React from 'react';
import './App.css';
import Cell from './components/Cell';
import { getRandom } from './components/utils/utils';

function App() {
  const size = 5;

  function renderCells() {
    const cells: JSX.Element[] = [];

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const random = getRandom(0, 1);
        cells.push(
          <Cell
            key={row * size + col}
            value={random}
            order={row * size + col}
          />
        );
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
