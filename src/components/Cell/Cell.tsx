import React, { FunctionComponent, memo } from 'react';

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
  gridSize: number;
  onHover: (index: number) => void;
  onClick: (index: number) => void;
}

const Cell: FunctionComponent<IProps> = ({
  cell,
  onHover,
  onClick,
  gridSize
}) => {
  // The last-gridSize cells are at the bottom
  const isBottomEdge = () => gridSize * gridSize - gridSize <= index;

  const { value, index, text } = cell;
  return (
    <div
      onMouseOver={() => onHover(index)}
      onClick={() => {
        if (cell.value === 1) {
          onClick(index);
        }
      }}
      className={classnames('cell', {
        'cell--active': value === 1,
        'cell--hover': cell.isHovered,
        'cell__left-edge': index % gridSize === 0,
        'cell__bottom-edge': isBottomEdge()
      })}
    >
      {text}
    </div>
  );
};

export default memo(Cell);
