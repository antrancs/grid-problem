import React, { FunctionComponent } from 'react';

import classnames from 'classnames';
import './Cell.css';

interface IProps {
  value: number;
  order: number;
}

const Cell: FunctionComponent<IProps> = ({ value, order }) => {
  return (
    <div
      className={classnames('grid-cell', {
        'grid-cell--active': value === 1
      })}
    >
      {value} ({order})
    </div>
  );
};

export default Cell;
