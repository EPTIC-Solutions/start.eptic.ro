import { useInterval } from "react-use";
import { useState } from "react";
import { useEffect } from "react";
import Stars from "./Stars";
import useLogger from "../utils/useLogger";
import styles from "../styles/Gradients.module.css";

const Gradient = () => {
  const getTime = () => {
    const date = new Date();
    return {
      hour: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    };
  };
  const [time, setTime] = useState(getTime());
  const [delay, setDelay] = useState(5);
  const logger = useLogger();

  useInterval(() => {
    logger("New time", time);
    setTime(getTime());
  }, delay);

  useEffect(() => {
    setDelay(((60 - time.minutes) * 60 - time.seconds) * 1000);
  }, [time]);

  return (
    <>
      <div className={`${styles["hour-" + time.hour]} absolute inset-0`}></div>
      {(time.hour >= 22 || time.hour <= 5) && <Stars />}
    </>
  );
};

export default Gradient;
