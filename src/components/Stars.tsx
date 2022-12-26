import { useEffect, useRef, useState } from "react";

type StarData = {
  y: number;
  x: number;
  opacity: number;
  size: number;
};

const generateStar = (): StarData => ({
  y: Math.random() * window.innerHeight,
  x: Math.random() * window.innerWidth,
  opacity: Math.floor(Math.random() * 40 + 10),
  size: Math.random() * 1,
});

const generateStars = (count: number): StarData[] => {
  const stars: StarData[] = [];

  try {
    console.time("Calculate star positions");

    for (let i = 0; i < count; i++) {
      stars.push(generateStar());
    }

    console.timeEnd("Calculate star positions");
  } catch {}

  new Promise<void>((resolve) => {
    localStorage.stars = JSON.stringify({
      stars,
      added: new Date().getTime(),
    });
    console.log("Stars saved to local storage");
    resolve();
  });

  console.log("Stars positions:", stars);
  return stars;
};

const drawStars = (canvas: HTMLCanvasElement, stars: StarData[]) => {
  const ctx = canvas.getContext("2d")!;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  stars.forEach((star) => {
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity / 100})`;
    ctx.strokeStyle = ctx.fillStyle;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  });

  console.log("Stars drawn");
};

/**
 *
 * @param {number} stars The number of stars to show on the screen
 * @returns
 */
function Stars({ stars = 2500 }: { stars?: number }) {
  const [starsPositions] = useState<StarData[]>(generateStars(stars));
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawStars(canvas.current!, starsPositions);
  }, []);

  return (
    <div id="stars">
      <canvas ref={canvas} className="absolute" />
    </div>
  );
}

export default Stars;
