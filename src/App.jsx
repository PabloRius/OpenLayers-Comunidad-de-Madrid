// Styles
import "ol/ol.css";
import "./App.css";

// Custom Components
import { NavMenu } from "./components/menus/NavMenu";

// Custom Hooks
import { SettingsMenu } from "./components/menus/SettingsMenu";
import { useMapNew } from "./hooks/useMapNew";
import { Loader } from "./components/accessibility/Loader";
import { useData } from "./hooks/useData";

function App() {
  const { selected, updateSelected, settings, toggleShowGroupLayers } =
    useMapNew();
  const { data, loading } = useData({ municipality: selected, year: "2014" });

  return (
    <>
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
      <NavMenu
        selected={selected}
        updateSelected={updateSelected}
        data={data}
      />
      <SettingsMenu
        toggleShowGroupLayers={toggleShowGroupLayers}
        settings={settings}
      />
      <Loader loading={loading} />
    </>
  );
}

export default App;
