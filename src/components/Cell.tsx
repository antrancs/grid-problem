import React, { FunctionComponent } from 'react';

import classnames from 'classnames';
import './Cell.css';

interface IProps {
  value: number;
  order: number;
}

const Cell: FunctionComponent<IProps> = ({ value, order }) => {
  return (
    <button
      className={classnames('grid-cell', {
        'grid-cell--active': value === 1
      })}
    >
      {value} ({order})
    </button>
  );
};

export default Cell;
