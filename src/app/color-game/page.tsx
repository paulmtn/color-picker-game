'use client'

import ColorWheel from "@/components/ColorWheel";
import ImageCanvas from "@/components/ImageCanvas";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const images = [
    "/images/image1.jpeg",
    "/images/image2.jpeg",
    "/images/image3.jpeg",
    "/images/image4.jpeg"
  ]



export default function Game() {
  const [targetColor, setTargetColor] = useState<string>("#fff"); // The actual averaged color
  const [userColor, setUserColor] = useState<string>("#fff");     // User's guess
  const [score, setScore] = useState<number | null>(null);        // Result after submit
  const [gameKey, setGameKey] = useState<number>(0); // Used to reset the game
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  function pickRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImage(images[randomIndex]);
  }

  function hexToRGB(hex: string) {
    const cleanHex = hex.replace("#", "");

    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);

    return { r, g, b };
  }

  function colorDistance(hex1: string, hex2: string) {
    const c1 = hexToRGB(hex1);
    const c2 = hexToRGB(hex2);

    const dr = c1.r-c2.r;
    const dg = c1.g-c2.g;
    const db = c1.b-c2.b;

    return Math.sqrt(dr**2 + dg**2 + db**2);
  }

  function calculateScore(target: string, guess:string) {
    const distance = colorDistance(target, guess);
    const maxDistance = Math.sqrt(255 ** 2 * 3);

    const normalized = 1 - distance / maxDistance;
    return Math.round(Math.max(0, normalized * 100));

  }

  function handleSubmit() {
    const result = calculateScore(targetColor, userColor);
    setScore(result);
  }

  useEffect(() => {
    pickRandomImage();
  }, []);

  return (
    <main style={{ backgroundColor: "rgb(99, 99, 99)", minHeight: "100vh"}}>
      <div style={{display: 'flex', padding: '20px'}}>
        <div>
          <ImageCanvas 
          imageSrc={currentImage}
          onColorSampled={(hex) => setTargetColor(hex)}
          />
        </div>
        <div>
          <ColorWheel onColorChange={(hex) => setUserColor(hex)}/>
        </div>
        <div style={{padding: "20px"}}>
          <Button onClick={handleSubmit}>Guess</Button>
          {score !== null && (
            <p style={{color: "black"}}>Score: {score}</p>
          )}
        </div>
      </div>
    </main>

  );
}

