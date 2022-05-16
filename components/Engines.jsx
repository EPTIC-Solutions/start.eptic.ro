import { useEngine } from "../utils/useEngine";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
// import useOS from "../utils/useOS";

const Engines = () => {
  const { engines, isActive, setActive, setClearInput } = useEngine();
  // const operatingSystem = useOS();

  const getControlKey = () => {
    // if (operatingSystem === "Windows") return "Alt";
    return "Alt";
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      try {
        if (!event.altKey) return;
        const keyInt = parseInt(event.key);
        if (keyInt > 0 && keyInt <= 9 && engines.length <= keyInt) {
          setActive(keyInt - 1);
        } else if (event.key === "c") {
          setClearInput(true);
        } else {
          return;
        }
        event.preventDefault();
      } catch {}
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={
        styles.engines +
        " snap-x overflow-x-auto justify-start sm:justify-center"
      }
    >
      {engines.map(({ name, src, alt }, index) => {
        return (
          <img
            key={`${name} - ${index}`}
            src={src}
            alt={alt}
            className={`${
              isActive(name) ? styles.enginesActive : null
            } snap-center`}
            onClick={() => setActive(index)}
          />
        );
      })}
    </div>
  );
};

export default Engines;
