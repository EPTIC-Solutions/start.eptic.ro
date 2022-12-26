import { useEffect, useState } from "react";
import isMac from "../utils/isMac";

const Instructions = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [firstTimeHere, setFirstTimeHere] = useState(
    !localStorage.getItem("firstTimeHere")
  );

  useEffect(() => {
    if (!firstTimeHere) {
      localStorage.setItem("firstTimeHere", "false");
    }
  }, [firstTimeHere]);

  const onMouseEnter = () => {
    setShowTooltip(true);

    setFirstTimeHere(false);
  };

  const onMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="absolute z-50 right-5 bottom-5">
      <button
        className={`${firstTimeHere ? "animate-bounce" : ""}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onMouseEnter}
        onBlur={onMouseLeave}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-white drop-shadow"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      {showTooltip && (
        <div className="absolute right-0 p-4 prose origin-bottom-right bg-white rounded-lg shadow-lg bottom-16 w-80">
          <h3>Site Instructions</h3>
          <h4>Shortcuts</h4>
          <ul>
            <li>
              <code>{isMac() ? "⌘" : "ALT+"}[1-9]</code> to switch between
              engines
            </li>
            <li>
              <code>{isMac() ? "⌘" : "ALT+"}C</code> to clear the search input
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Instructions;
