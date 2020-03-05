import React, { useState, FunctionComponent } from 'react';

interface IProps {
  onUpdateSize: (size: number) => void;
}

const Slider: FunctionComponent<IProps> = ({ onUpdateSize }) => {
  const [sizeRange, setSizeRange] = useState(5);

  return (
    <section>
      <input
        type="range"
        min={1}
        max={10}
        onChange={event => setSizeRange(+event.target.value)}
        value={sizeRange}
      />
      <button onClick={() => onUpdateSize(sizeRange)}>
        Create {sizeRange}x{sizeRange}
      </button>
    </section>
  );
};

export default Slider;
