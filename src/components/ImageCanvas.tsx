// Tell Next.js this component runs in the browser (not the server)
'use client';

// Import React functions we need
import { useRef, useEffect, useState } from 'react';

type Props = {
    images: string[]
}
// Define the ImageCanvas component as a function
function ImageCanvas({ images }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);


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

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
    }, [imageSrc]);

    return(
        <canvas ref={canvasRef} />
    )
}

export default ImageCanvas;