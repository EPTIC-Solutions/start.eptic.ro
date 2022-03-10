import { useInterval } from "react-use";
import { useState } from "react";
import React from "react";

const Gradient = () => {
  const [hour, setHour] = useState(new Date().getHours());
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const [delay, setDelay] = useState();

  useInterval(() => {
    console.info("Hour changed", hour, minutes, delay, (60 - minutes) * 1000);
    const date = new Date();
    setHour(date.getHours());
    setMinutes(date.getMinutes());
    console.log(1);
  }, delay);

  React.useEffect(() => {
    setDelay((60 - minutes) * 60 * 1000);
  }, [minutes]);

  if (hour > 11 && hour < 17) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-sky-700 to-sky-200"></div>
    );
  }
  if ((hour >= 0 && hour < 7) || (hour > 20 && hour < 24)) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-sky-900 to-gray-900"></div>
    );
  }
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-sky-800 to-orange-100"></div>
  );
};

export default Gradient;
