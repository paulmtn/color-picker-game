// Tell Next.js this component runs in the browser (not the server)
'use client';

// Import react functions
import { useRef, useEffect, useState } from 'react';

type Props = {
    imageSrc: string | null
    onColorSampled?: (hex: string) => void;
}
const MAX_WIDTH = 1000;

// Define the ImageCanvas component as a function
function ImageCanvas({ imageSrc, onColorSampled }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!imageSrc || !canvasRef.current) {
            return;
        }

        const img = new Image();
        img.src = imageSrc;

        img.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            let width = img.width;
            let height = img.height;

            if (width > MAX_WIDTH) {
                const scale = MAX_WIDTH / width;
                width = MAX_WIDTH;
                height = height * scale;
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            const boxSize = 15;
            const x = Math.floor(Math.random() * (width - boxSize));
            const y = Math.floor(Math.random() * (height - boxSize));

            const data = ctx.getImageData(x, y, 5, 5).data;
            let r = 0, g = 0, b = 0;
            for (let i = 0; i < data.length; i += 4) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
            }
            const hex = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
            

            ctx.strokeStyle = "red";
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, boxSize, boxSize);

            if (onColorSampled) onColorSampled(hex);
        };
    }, [imageSrc]);

    return(
        <canvas ref={canvasRef}/>
    )
}

export default ImageCanvas;