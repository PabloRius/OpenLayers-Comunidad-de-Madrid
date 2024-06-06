// Styles
import "ol/ol.css";
import "./App.css";

// Custom Components
import { NavMenu } from "./components/NavMenu";

// Custom Hooks
import { useMap } from "./hooks/useMap";

function App() {
  const { toolTip } = useMap();

  return (
    <>
      <h1 className="pageTitle">OpenLayer App</h1>
      <div
        id="map"
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <NavMenu toolTip={toolTip} />
    </>
  );
}

export default App;
