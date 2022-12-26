import { useState } from "react";
import { useEffect } from "react";
import Stars from "./Stars";
import styles from "../styles/Gradient.module.css";

const getTime = () => {
  const date = new Date();
  return {
    hour: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
};

const Gradient = () => {
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime());
    }, ((60 - time.minutes) * 60 - time.seconds) * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="z-0">
      <div className={`${styles["hour-" + time.hour]} absolute inset-0`}></div>
      {(time.hour >= 22 || time.hour <= 5) && <Stars />}
    </div>
  );
};

export default Gradient;
