import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TimelineIcon from "@mui/icons-material/Timeline";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";

import "./TableChart.css";
import { TimeLine } from "./TimeLine";
import { Tablechart } from "./TableChart";

/* eslint-disable react/prop-types */
export function ExtraData({ indexes, values }) {
  const [showExtendedData, setShowExtendedData] = useState(false);
  const [showTimeLine, setShowTimeline] = useState(false);
  if (!values || !indexes) return;

  return (
    <div className="parent">
      <div className="footerButtons">
        <Tooltip title="Show yearly progression">
          <IconButton
            style={{
              height: "20px",
              width: "35px",
              alignContent: "center",
            }}
            onClick={() => {
              setShowExtendedData(false);
              setShowTimeline((prev) => !prev);
            }}
          >
            <TimelineIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Show extended data">
          <IconButton
            style={{
              height: "20px",
              width: "35px",
              alignContent: "center",
            }}
            onClick={() => {
              setShowTimeline(false);
              setShowExtendedData((prev) => !prev);
            }}
          >
            <MoreHorizIcon />
          </IconButton>
        </Tooltip>
      </div>
      {showExtendedData && <Tablechart indexes={indexes} values={values} />}
      {showTimeLine && <TimeLine indexes={indexes} values={values} />}
    </div>
  );
}
