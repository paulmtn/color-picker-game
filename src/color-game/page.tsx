'use client'

import ColorWheel from "@/components/ColorWheel";
import ImageCanvas from "@/components/ImageCanvas";
import { useState } from "react";


export default function Home() {
  const paintings = [
    "/paintings/painting1.jpeg"
  ]

  const [targetColor, setTargetColor] = useState<string>("#fff"); // The actual averaged color
  const [userColor, setUserColor] = useState<string>("#fff");     // User's guess
  const [score, setScore] = useState<number | null>(null);        // Result after submit
  const [gameKey, setGameKey] = useState<number>(0); // Used to reset the game


  return (
    <div style={{display: 'flex', padding: '20px'}}>
      <div>
        <ImageCanvas images={paintings}/>
      </div>
      <div>
        <ColorWheel />
      </div>
    </div>
  );
}

// have a button ot route the user to another page which is the app