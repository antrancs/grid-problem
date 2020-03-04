import React, { FunctionComponent } from 'react';

import classnames from 'classnames';
import './Cell.css';

export interface ICell {
  // Unique index of the cell in a grid
  index: number;

  isHovered: boolean;

  // 0 or 1
  value: number;

  // Text to be displayed in that cell
  text: string;
}

interface IProps {
  cell: ICell;
  onHover: (index: number) => void;
  onClick: (index: number) => void;
}

const Cell: FunctionComponent<IProps> = ({ cell, onHover, onClick }) => {
  const { value, index, text } = cell;
  return (
    <button
      onMouseOver={() => onHover(index)}
      onClick={() => {
        if (cell.value === 1) {
          onClick(index);
        }
      }}
      className={classnames('grid-cell', {
        'grid-cell--active': value === 1,
        'grid-cell--hover': cell.isHovered
      })}
    >
      {text}
    </button>
  );
};

export default Cell;
