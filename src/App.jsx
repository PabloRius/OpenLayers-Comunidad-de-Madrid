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
import { YearSelector } from "./components/menus/YearSelector";
import { useState } from "react";

function App() {
  const [year, setYear] = useState(2021);
  const {
    selected,
    updateSelected,
    settings,
    toggleShowGroupLayers,
    toggleShowFilter,
  } = useMapNew();
  const { data, loading } = useData({ municipality: selected });

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
        selected={year}
        updateSelected={updateSelected}
        data={data}
        year={year}
      />
      <SettingsMenu
        toggleShowGroupLayers={toggleShowGroupLayers}
        toggleShowFilter={toggleShowFilter}
        settings={settings}
      />
      <YearSelector selected={year} changeSelected={setYear} />
      <Loader loading={loading} />
    </>
  );
}

export default App;
