// Tells Next.js that the file must run in the browser because we are using useState
'use client';

// useState is a React Hook that lets a component store and update state
import { useState } from 'react';
import { Sketch } from '@uiw/react-color';

type Props = {
  onColorChange?: (hex : string) => void;
}
function ColorWheel({onColorChange}: Props) {
  const [hex, setHex] = useState("#fff"); // useState() returns a hex and the setHex function
  return (
    <Sketch
      style={{ marginLeft: 20 }}
      color={hex}

      // When onChange happens, call this function with the color argument
      onChange={(color) => {
        if (onColorChange) {
          onColorChange(color.hex);
        }
      }}
    />
  );
}

export default ColorWheel;
