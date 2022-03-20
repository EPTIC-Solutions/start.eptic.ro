import { useRef, useEffect, useState } from "react";

const SiteInstructions = () => {
  const instRef = useRef();
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!instRef.current) return;

    const ref = instRef.current;
    const onMouseEnter = () => {
      setShowTooltip(true);
    };
    const onMouseLeave = () => {
      setShowTooltip(false);
    };
    ref.addEventListener("mouseenter", onMouseEnter);
    ref.addEventListener("mouseleave", onMouseLeave);

    return () => {
      ref.removeEventListener("mouseenter", onMouseEnter);
      ref.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [instRef]);

  return (
    <div className="fixed right-10 bottom-10 z-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white shadow-please"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        ref={instRef}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {showTooltip && (
        <div className="absolute origin-bottom-right bottom-8 right-0 bg-white rounded-lg shadow-lg p-4 w-64 prose">
          <h3>Site Instructions</h3>
          <h4>Shortcuts</h4>
          <ul>
            <li>
              <code>ALT+[1-9]</code> to switch between engines
            </li>
            <li>
              <code>ALT+C</code> to clear the search input
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SiteInstructions;
