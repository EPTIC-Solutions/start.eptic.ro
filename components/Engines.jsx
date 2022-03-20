import { useEngine } from "../utils/useEngine";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

const Engines = () => {
  const { engines, isActive, setActive, setClearInput } = useEngine();

  const getOperatingSystem = () => {
    let operatingSystem = "Not known";
    if (
      typeof navigator.userAgentData === "undefined" ||
      typeof navigator.userAgentData.platform === "undefined"
    ) {
      if (navigator.platform.indexOf("Win") !== -1) {
        operatingSystem = "Windows OS";
      }
      if (navigator.platform.indexOf("Mac") !== -1) {
        operatingSystem = "MacOS";
      }
      if (navigator.platform.indexOf("X11") !== -1) {
        operatingSystem = "UNIX OS";
      }
      if (navigator.platform.indexOf("Linux") !== -1) {
        operatingSystem = "Linux OS";
      }
      return operatingSystem;
    }

    if (navigator.userAgentData.platform.indexOf("Win") !== -1) {
      operatingSystem = "Windows OS";
    }
    if (navigator.userAgentData.platform.indexOf("Mac") !== -1) {
      operatingSystem = "MacOS";
    }
    if (navigator.userAgentData.platform.indexOf("X11") !== -1) {
      operatingSystem = "UNIX OS";
    }
    if (navigator.userAgentData.platform.indexOf("Linux") !== -1) {
      operatingSystem = "Linux OS";
    }
    return operatingSystem;
  };

  const getControlKey = () => {
    // if (getOperatingSystem() === "Windows OS") return "Alt";
    return "Alt";
  };

  useEffect(() => {
    let checkInput = false;

    const handleKeyDown = (event) => {
      // Control
      if (event.key === getControlKey()) {
        checkInput = true;
      }
      if (checkInput) {
        try {
          const keyInt = parseInt(event.key);
          if (keyInt > 0 && keyInt <= 9) {
            setActive(keyInt - 1);
          } else if (event.key === "c") {
            setClearInput(true);
          } else {
            return;
          }
          event.preventDefault();
        } catch {}
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === getControlKey()) {
        checkInput = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className={styles.engines + " overflow-x-auto"}>
      {engines.map(({ name, src, alt }, index) => {
        return (
          <img
            key={`${name} - ${index}`}
            src={src}
            alt={alt}
            className={isActive(name) ? styles.enginesActive : null}
            onClick={() => setActive(index)}
          />
        );
      })}
    </div>
  );
};

export default Engines;
