import Engines from "./components/Engines";
import Gradient from "./components/Gradient";
import Logo from "./assets/logo.svg";
import Instructions from "./components/Instructions";

function App() {
  return (
    <>
      <Gradient />
      <Engines />
      <Instructions />
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "2rem",
          opacity: 0.2,
          width: 100,
        }}
      >
        <img src={Logo} alt="EPTIC Logo" width="300px" height="100px" />
      </div>
    </>
  );
}

export default App;
