import { useInterval } from "react-use";
import { useState } from "react";
import { useEffect } from "react";
import Stars from "./Stars";
import useLogger from "../utils/useLogger";

const Gradient = () => {
  const [hour, setHour] = useState();
  const [minutes, setMinutes] = useState();
  const [delay, setDelay] = useState(5);
  const logger = useLogger();

  useInterval(() => {
    logger("Debug: Hour changed. Old hour:", hour, "Old minutes:", minutes);
    setHour(new Date().getHours());
    setMinutes(new Date().getMinutes());
  }, delay);

  useEffect(() => {
    setDelay((60 - minutes) * 60 * 1000);
  }, [minutes]);

  /**
   * Evening
   */
  if (hour > 11 && hour < 18) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-sky-700 to-sky-200"></div>
    );
  }

  /**
   * Night
   */
  if ((hour >= 0 && hour < 5) || (hour > 21 && hour < 24)) {
    return (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-sky-900"></div>
        <Stars />
      </>
    );
  }

  /**
   * Sunrise
   */
  if (hour >= 5 && hour <= 7) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-sky-800/70 via-orange-300/40 to-orange-300"></div>
    );
  }

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-sky-800 to-orange-100"></div>
  );
};

export default Gradient;
