/* eslint-disable react/prop-types */
import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import LayersIcon from "@mui/icons-material/Layers";

import "./SettingsMenu.css";

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

export function SettingsMenu({ toggleShowGroupLayers, settings }) {
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const toggleLayers = () => {
    toggleShowGroupLayers();
  };

  return (
    <menu className="SettingsMenu">
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
  );
}
