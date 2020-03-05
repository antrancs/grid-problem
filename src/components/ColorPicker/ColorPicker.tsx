import React, { useState, FunctionComponent } from 'react';
import { BlockPicker, ColorResult } from 'react-color';

import './ColorPicker.css';

interface IProps {
  onColorChanged: (color: string) => void;
  color: string;
}

const ColorPicker: FunctionComponent<IProps> = ({ onColorChanged, color }) => {
  const [showPicker, setShowPicker] = useState(false);

  function handleBtnClicked() {
    setShowPicker(!showPicker);
  }

  function handleColorChanged(color: ColorResult) {
    onColorChanged(color.hex);
    setShowPicker(false);
  }

  return (
    <div className="color-picker">
      <button onClick={handleBtnClicked} className="color-btn">
        Change color
      </button>

      {showPicker && (
        <div className="color-wrapper">
          <BlockPicker color={color} onChangeComplete={handleColorChanged} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
