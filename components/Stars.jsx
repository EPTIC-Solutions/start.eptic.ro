import { useState, useEffect, useCallback } from "react";
import useLogger from "../utils/useLogger";

/**
 *
 * @param {number} stars The number of stars to show on the screen
 * @param {number} starsSpread The minimum amount of pixels between each star
 * @param {number} debounceDuration The duration between stars re-renders on window resize
 * @returns
 */
function Stars({ stars = 2500, starsSpread = 1, debounceDuration = 100 }) {
  const [starsPositions, setStarsPositions] = useState([]);

  const logger = useLogger();

  const calculateStarPosition = (prevState, recursionCheck = 1) => {
    const position = {
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.floor(Math.random() * 25 + 5),
      size: Math.random() * 2,
    };

    const isValidPosition = checkStarPosition(position, prevState);

    if (!isValidPosition) {
      if (recursionCheck === 10) {
        throw new Error(
          `Too many recursions, please make sure the spread is small enough for ${stars} stars to fit into the window`
        );
      }
      return calculateStarPosition(prevState, ++recursionCheck);
    }

    return position;
  };

  const checkStarPosition = (position, stars) => {
    for (let i = 0; i < stars.length; i++) {
      /**
       * Find out if the new position is too close to a star already on the sky
       */
      if (
        Math.abs(position.x - stars[i].x) + Math.abs(position.y - stars[i].y) <
        (starsSpread * 2) / 10
      ) {
        return false;
      }
    }
    return true;
  };

  const generateStars = useCallback(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    if (localStorage.stars) {
      const starsData = JSON.parse(localStorage.stars);
      const date1 = new Date(starsData.added);
      const date2 = new Date();
      const diffTime = Math.abs(date2 - date1);
      const minutesDiff = Math.ceil(diffTime / (1000 * 60));
      if (starsData.stars.length == stars && minutesDiff < 5) {
        setStarsPositions(starsData.stars);
        logger("Stars positions:", starsData.stars);
        logger("Stars loaded from local storage");
        return;
      }
    }

    const newPositions = [];

    try {
      if (
        typeof window === "undefined" ||
        import.meta.env.DEV ||
        urlSearchParams.has("debugOnprod")
      ) {
        console.time("Calculate star positions");
      }
      for (let i = 0; i < stars; i++) {
        newPositions.push(calculateStarPosition(stars));
      }
      if (
        typeof window === "undefined" ||
        import.meta.env.DEV ||
        urlSearchParams.has("debugOnprod")
      ) {
        console.timeEnd("Calculate star positions");
      }
    } catch {}

    localStorage.stars = JSON.stringify({
      stars: newPositions,
      added: new Date().getTime(),
    });

    logger("Stars positions:", newPositions);
    setStarsPositions(newPositions);
  }, [stars, starsSpread]);

  useEffect(() => {
    generateStars();
  }, []);

  return (
    <div id="stars">
      {starsPositions.map((position, index) => (
        <div
          className={`rounded-full fixed bg-white`}
          style={{
            top: `${position.y}%`,
            left: `${position.x}%`,
            opacity: position.opacity / 100,
            width: `${position.size}px`,
            height: `${position.size}px`,
          }}
          key={index}
        ></div>
      ))}
    </div>
  );
}

export default Stars;
