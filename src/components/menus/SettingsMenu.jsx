/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, IconButton, Tooltip } from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import LayersIcon from "@mui/icons-material/Layers";
import FilterIcon from "@mui/icons-material/FilterList";

import "./SettingsMenu.css";
import { useIndex } from "../../hooks/useIndex";

const ExpandableIconButton = ({ icon, toolTip, activated, toggle }) => {
  return (
    <Tooltip title={toolTip} placement="bottom">
      <IconButton
        size="large"
        color={activated ? "info" : "default"}
        onClick={toggle}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export function SettingsMenu({
  toggleShowGroupLayers,
  toggleShowFilter,
  settings,
}) {
  const [menuOpen, setMenuOpen] = useState(true);
  const [filterSelector, setFilterSelector] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    index: null,
    group: null,
  });
  const { indexInfo } = useIndex();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const toggleLayers = () => {
    toggleShowGroupLayers();
  };

  const toggleFilter = () => {
    // toggleShowFilter();
    setFilterSelector((prev) => !prev);
  };

  const applyFilters = () => {
    if (!selectedFilters.index || selectedFilters.group === null) return;
    toggleShowFilter({
      index: selectedFilters.index,
      group: selectedFilters.group,
    });
  };

  return (
    <>
      {filterSelector && (
        <div className="toggleShowFilter">
          <div className="menu">
            <div className="menuCol">
              <h3>Select an index and a group to visualice on the map</h3>
              <div className="menuRow indexSelection">
                {Object.keys(indexInfo).map((index) => {
                  if (
                    index === undefined ||
                    indexInfo[index].Nombre_Variable === "" ||
                    indexInfo[index].Nombre_Variable === undefined
                  )
                    return <></>;
                  return (
                    <div
                      key={index}
                      className={`menuRowItem ${
                        selectedFilters.index === index
                          ? "menuRowItemSelected"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedFilters((prev) => {
                          return { ...prev, index: index };
                        });
                      }}
                    >
                      <p>{indexInfo[index].Nombre_Variable}</p>
                    </div>
                  );
                })}
                <div className="menuRow menuRowSeparator"></div>
                <div className="menuRow groupSelection">
                  {[...Array(4).keys()].map((key) => {
                    return (
                      <div
                        className={`menuRowItem ${
                          selectedFilters.group === key
                            ? "menuRowItemSelected"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedFilters((prev) => {
                            return { ...prev, group: key };
                          });
                        }}
                        key={key}
                      >
                        {"Grupo "}
                        {key}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="menuRow">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    setFilterSelector(false);
                    setSelectedFilters({
                      index: null,
                      group: null,
                    });
                    toggleShowFilter({
                      index: null,
                      group: null,
                    });
                  }}
                >
                  Clear filters
                </Button>
                <Tooltip
                  title={
                    !selectedFilters.group || !selectedFilters.index
                      ? "Please select an index and a group to visualize"
                      : null
                  }
                >
                  <span>
                    <Button
                      color="success"
                      variant="contained"
                      disabled={
                        selectedFilters.group === null || !selectedFilters.index
                      }
                      onClick={() => {
                        applyFilters();
                        setFilterSelector(false);
                      }}
                    >
                      Apply filter
                    </Button>
                  </span>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      )}
      <menu className="SettingsMenu">
        <div className={`expandedMenu ${menuOpen ? "hidden" : ""}`}>
          <ExpandableIconButton
            icon={<FilterIcon />}
            toolTip={"Filter"}
            activated={settings.filter.index && settings.filter.group}
            toggle={toggleFilter}
          />
        </div>
        <div className={`expandedMenu ${menuOpen ? "hidden" : ""}`}>
          <ExpandableIconButton
            icon={<LayersIcon />}
            toolTip={"Show groups"}
            activated={settings.showGroupLayers}
            toggle={toggleLayers}
          />
        </div>
        <Tooltip title="Toggle view options" placement="bottom">
          <IconButton onClick={toggleMenu} size="large">
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </menu>
    </>
  );
}
