import React, { FunctionComponent } from 'react';

import classnames from 'classnames';
import './Cell.css';

export interface ICell {
  // Unique index of the cell in a grid
  index: number;
  isHovered: boolean;

  // 0 or 1
  value: number;
}

interface IProps {
  cell: ICell;
  onHover: (index: number) => void;
}

const Cell: FunctionComponent<IProps> = ({ cell, onHover }) => {
  const { value, index } = cell;
  return (
    <button
      onMouseOver={() => onHover(index)}
      className={classnames('grid-cell', {
        'grid-cell--active': value === 1,
        'grid-cell--hover': cell.isHovered
      })}
    >
      {value} ({index})
    </button>
  );
};

export default Cell;
