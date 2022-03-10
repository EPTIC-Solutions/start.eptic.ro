import { useEffect, useRef, useState } from "react";
import Engines from "../components/engines";
import { useEngine } from "../utils/useEngine";
import Logo from "/logo.svg";
import Gradient from "../components/gradient";

const App = () => {
  const { active, doSearch } = useEngine();
  const [input, setInput] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [active]);

  return (
    <div>
      <Gradient />
      <Engines />
      <div id="container">
        <form
          id="form"
          onSubmit={(e) => {
            e.preventDefault();
            doSearch(input);
          }}
        >
          <div id="input">
            <input
              ref={inputRef}
              id="i"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Search ${active.name}`}
              autoComplete="off"
            />
          </div>
        </form>

        <div
          style={{
            position: "fixed",
            bottom: 100,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <img src={Logo} alt="EPTIC Logo" width="300px" height="100px" />
        </div>
      </div>
    </div>
  );
}

export default App;