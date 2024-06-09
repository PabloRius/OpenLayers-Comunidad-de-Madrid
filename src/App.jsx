// Styles
import "ol/ol.css";
import "./App.css";

// Custom Components
import { NavMenu } from "./components/menus/NavMenu";

// Custom Hooks
import { useMap } from "./hooks/useMap";
import { SettingsMenu } from "./components/menus/SettingsMenu";

function App() {
  const {
    searchMunicipality,
    searchResults,
    selected,
    updateSelected,
    settings,
    toggleShowGroupLayers,
  } = useMap();

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
        searchMunicipality={searchMunicipality}
        searchResults={searchResults}
        selected={selected}
        updateSelected={updateSelected}
      />
      <SettingsMenu
        toggleShowGroupLayers={toggleShowGroupLayers}
        settings={settings}
      />
    </>
  );
}

export default App;
