import { useState, useEffect } from "react";
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
  stars = 50,
  starsSize = 2,
  starsSpread = 30,
  debounceDuration = 300,
}) {
  const getWindowSize = () => {
    return {
      x: window.innerWidth - starsSize,
      y: window.innerHeight - starsSize,
    };
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [starsPositions, setStarsPositions] = useState([]);
  const logger = useLogger();

  const [, cancelDebounce] = useDebounce(
    () => generateStars(),
    debounceDuration,
    [windowSize]
  );

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize(getWindowSize());
    };

    cancelDebounce();
    generateStars();

    window.addEventListener("resize", updateWindowSize);
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  useEffect(() => {
    logger("Debug stars positions:", starsPositions);
  }, [starsPositions]);

  const generateStars = () => {
    logger("Debug window:", windowSize);
    const newPositions = [];

    for (let i = 0; i < stars; i++) {
      newPositions.push(calculateStarPosition(newPositions));
    }

    setStarsPositions(newPositions);
  };

  const calculateStarPosition = (prevState, recursionCheck = 1) => {
    const positions = {
      x: Math.floor(Math.random() * windowSize.x),
      y: Math.floor(Math.random() * windowSize.y),
      opacity: Math.floor(Math.random() * 60 + 20),
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
        starsSpread * 2
      ) {
        return false;
      }
    }
    return true;
  };

  return (
    <>
      {starsPositions.map((position, index) => (
        <div
          className={`rounded-full fixed bg-white`}
          style={{
            top: position.y,
            left: position.x,
            width: starsSize,
            height: starsSize,
            opacity: position.opacity / 100,
          }}
          key={index}
        ></div>
      ))}
    </>
  );
}

export default Stars;
