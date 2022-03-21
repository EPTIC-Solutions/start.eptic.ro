import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "react-use";
import useLogger from "../utils/useLogger";

/**
 *
 * @param {number} stars The number of stars to show on the screen
 * @param {number} starsSize Stars size, in pixels
 * @param {number} starsSpread The minimum amount of pixels between each star
 * @param {number} debounceDuration The duration between stars re-renders on window resize
 * @returns
 */
function Stars({
  stars = 1000,
  starsSizeInitial = 1,
  starsSpread = 1,
  debounceDuration = 100,
}) {
  const [starsSize, setStarsSize] = useState(starsSizeInitial);

  const getWindowSize = () => {
    return {
      x: window.innerWidth - starsSize,
      y: window.innerHeight - starsSize,
    };
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [starsPositions, setStarsPositions] = useState([]);

  const logger = useLogger();

  const calculateStarPosition = (prevState, recursionCheck = 1) => {
    const positions = {
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.floor(Math.random() * 40 + 10),
    };

    const isValidPosition = checkStarPosition(positions, prevState);

    if (!isValidPosition) {
      if (recursionCheck === 10) {
        throw new Error(
          "Too many recursions, please make sure the spread is small enough for 50 stars to fit into the window"
        );
      }
      return calculateStarPosition(prevState, ++recursionCheck);
    }

    return positions;
  };

  const checkStarPosition = (positions, stars) => {
    for (let i = 0; i < stars.length; i++) {
      /**
       * Find out if the new positions are too close to a star already on the sky
       */
      if (
        Math.abs(positions.x - stars[i].x) +
          Math.abs(positions.y - stars[i].y) <
        (starsSpread * 2) / 10
      ) {
        return false;
      }
    }
    return true;
  };

  const generateStars = useCallback(() => {
    if (localStorage.stars) {
      const starsData = JSON.parse(localStorage.stars);
      const date1 = new Date(starsData.added);
      const date2 = new Date();
      const diffTime = Math.abs(date2 - date1);
      const minutesDiff = Math.ceil(diffTime / (1000 * 60));
      if (minutesDiff < 5) {
        setStarsPositions(starsData.stars);
        logger("Stars positions:", starsData.stars);
        logger("Stars loaded from local storage");
        return;
      }
    }

    const newPositions = [];

    try {
      for (let i = 0; i < stars; i++) {
        newPositions.push(calculateStarPosition(newPositions));
      }
    } catch {}

    localStorage.stars = JSON.stringify({
      stars: newPositions,
      added: new Date().getTime(),
    });

    logger("Stars positions:", newPositions);
    setStarsPositions(newPositions);
  }, [stars, starsSpread]);

  const [, cancelDebounce] = useDebounce(
    () => {
      if (windowSize.x <= 640) {
        setStarsSize(1);
      } else if (starsSize !== starsSizeInitial) {
        setStarsSize(starsSizeInitial);
      }
    },
    debounceDuration,
    [windowSize]
  );

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize(getWindowSize());
    };

    generateStars();

    window.addEventListener("resize", updateWindowSize);
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
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
            width: starsSize,
            height: starsSize,
          }}
          key={index}
        ></div>
      ))}
    </div>
  );
}

export default Stars;
