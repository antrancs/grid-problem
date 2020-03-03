import React from 'react';
import './App.css';
import Cell from './components/Cell';

function App() {
  const size = 5;

  function renderCells() {
    const cells: JSX.Element[] = [];

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        cells.push(<Cell key={i * size + j * size} />);
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
