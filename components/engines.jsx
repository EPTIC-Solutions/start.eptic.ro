import { useEngine } from "../utils/useEngine";
import { useEffect } from "react";
import styles from '../styles/Home.module.css'

const Engines = () => {
  const { engines, isActive, setActive, handleActiveChange } = useEngine();
  let checkInput = false;

  const getOperatingSystem = () => {
    let operatingSystem = "Not known";
    if (navigator.userAgentData.platform === undefined) {
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
    if (getOperatingSystem() === "Windows OS") return "Alt";
    return "Control";
  };

  const handleKeyDown = (event) => {
    // Control
    if (event.key === getControlKey()) {
      checkInput = true;
    }
    if (checkInput) {
      try {
        const keyInt = parseInt(event.key);
        if (keyInt > 0 && keyInt <= 9) {
          setActive(engines[keyInt - 1]);
        }
      } catch {}
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === getControlKey()) {
      checkInput = false;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className={styles.engines}>
      {engines.map(({ name, src, alt }, index) => {
        return (
          <img
            key={`${name} - ${index}`}
            src={src}
            alt={alt}
            className={isActive(name) ? styles.enginesActive : ""}
            onClick={() => handleActiveChange(name)}
          />
        );
      })}
    </div>
  );
};

export default Engines;
