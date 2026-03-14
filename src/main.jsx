// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Theme (ONLY theme file inside src)
import "@oicl/openbridge-webcomponents/src/palettes/variables.css";
import '@oicl/openbridge-webcomponents/dist/automation/three-way-line/three-way-line.js';

/* ------------------------------------------------------
 * CORE OPENBRIDGE UI COMPONENTS
 * ---------------------------------------------------- */
import "@oicl/openbridge-webcomponents/dist/icons/icon-alarm-acknowledged-iec.js"
import "@oicl/openbridge-webcomponents/dist/components/brilliance-menu/brilliance-menu.js"
import "@oicl/openbridge-webcomponents/dist/icons/icon-palette-dimming.js"
import "@oicl/openbridge-webcomponents/dist/icons/icon-own-ship-iec.js"
import "@oicl/openbridge-webcomponents/dist/icons/icon-alerts-active.js"
import "@oicl/openbridge-webcomponents/dist/icons/icon-notification-filled.js"
import "@oicl/openbridge-webcomponents/dist/icons/icon-wrench.js"
import "@oicl/openbridge-webcomponents/dist/icons/icon-battery-vertical-empty.js"
import "@oicl/openbridge-webcomponents/dist/icons/icon-pump-on-vertical.d.ts"
import "@oicl/openbridge-webcomponents/dist/icons/icon-settings-iec.js"
import "@oicl/openbridge-webcomponents/dist/icons/icon-alert-list.js"
import "@oicl/openbridge-webcomponents/dist/icons/icon-battery-horizontal-empty.js"
import "@oicl/openbridge-webcomponents/dist/icons/icon-diagnostic-google.js"
import "@oicl/openbridge-webcomponents/dist/icons/icon-engine-fill.js"
import "@oicl/openbridge-webcomponents/dist/icons/icon-propulsion-static.js"
import"@oicl/openbridge-webcomponents/dist/icons/icon-menu-iec.js"
import"@oicl/openbridge-webcomponents/dist/icons/icon-trend.js"
import "@oicl/openbridge-webcomponents/dist/icons/icon-dashboard.js"
import "@oicl/openbridge-webcomponents/dist/icons/icon-user.js"
import "@oicl/openbridge-webcomponents/dist/icons/icon-alarm-unacknowledged-iec.js"
import "@oicl/openbridge-webcomponents/dist/icons/icon-command-no.js"
import "@oicl/openbridge-webcomponents/dist/icons/icon-cold-google.js"
import "@oicl/openbridge-webcomponents/dist/icons/icon-heat-google.js"
import "@oicl/openbridge-webcomponents/dist/icons/icon-hydraulic-separator.js"
import "@oicl/openbridge-webcomponents/dist/automation/automation-tank/automation-tank.js";
import "@oicl/openbridge-webcomponents/dist/icons/icon-tank.js"
import "@oicl/openbridge-webcomponents/dist/icons/icon-heatexhanger.js";
import "@oicl/openbridge-webcomponents/dist/icons/icon-filter.js"
import "@oicl/openbridge-webcomponents/dist/icons/icon-pump-on-horizontal.js"
import "@oicl/openbridge-webcomponents/dist/components/top-bar/top-bar.js";
import "@oicl/openbridge-webcomponents/dist/components/icon-button/icon-button.js";
import "@oicl/openbridge-webcomponents/dist/components/button/button.js";
import "@oicl/openbridge-webcomponents/dist/components/badge/badge.js";
import "@oicl/openbridge-webcomponents/dist/components/toggle-switch/toggle-switch.js";
import "@oicl/openbridge-webcomponents/dist/components/card-list-button/card-list-button.js";
import "@oicl/openbridge-webcomponents/dist/components/table/table.js";

/* ------------------------------------------------------
 * AUTOMATION PRIMITIVES (VALIDATED FROM YOUR FILES)
 * ---------------------------------------------------- */
import "@oicl/openbridge-webcomponents/dist/automation/automation-button/automation-button.js";
import "@oicl/openbridge-webcomponents/dist/automation/automation-input-modal/automation-input-modal.js";
import "@oicl/openbridge-webcomponents/dist/automation/automation-readout/automation-readout.js";
import "@oicl/openbridge-webcomponents/dist/automation/automation-tank/automation-tank.js";

import "@oicl/openbridge-webcomponents/dist/automation/horizontal-line/horizontal-line.js";
import "@oicl/openbridge-webcomponents/dist/automation/vertical-line/vertical-line.js";
import "@oicl/openbridge-webcomponents/dist/automation/direction-line/direction-line.js";
import "@oicl/openbridge-webcomponents/dist/automation/three-way-line/three-way-line.js";
import "@oicl/openbridge-webcomponents/dist/automation/corner-line/corner-line.js";
import "@oicl/openbridge-webcomponents/dist/automation/end-point-line/end-point-line.js";
import "@oicl/openbridge-webcomponents/dist/automation/line-cross/line-cross.js";
import "@oicl/openbridge-webcomponents/dist/automation/line-overlap/line-overlap.js";

/* ------------------------------------------------------
 * VALVES (CONFIRMED AVAILABLE)
 * ---------------------------------------------------- */
import "@oicl/openbridge-webcomponents/dist/automation/valve/valve.js";
import "@oicl/openbridge-webcomponents/dist/automation/valve-analog-three-way-icon/valve-analog-three-way-icon.js";
import "@oicl/openbridge-webcomponents/dist/automation/valve-analoge-two-way-icon/valve-analog-two-way-icon.js";

/* ------------------------------------------------------
 * PUMPS (EXACT FILENAMES YOU PROVIDED)
 * ---------------------------------------------------- */
import "@oicl/openbridge-webcomponents/dist/icons/icon-pump-off-vertical.js";
import "@oicl/openbridge-webcomponents/dist/icons/icon-pump-on-horizontal.js";
import "@oicl/openbridge-webcomponents/dist/icons/icon-pump-on-vertical.js";
import "@oicl/openbridge-webcomponents/dist/icons/icon-pump-static-horizontal.js";
import "@oicl/openbridge-webcomponents/dist/icons/icon-pump-static-vertical.js";
import "@oicl/openbridge-webcomponents/dist/icons/icon-pump-off-horizontal.js";

/* ------------------------------------------------------
 * HEAT EXCHANGERS / HEAT PUMPS (VALIDATED)
 * ---------------------------------------------------- */
import "@oicl/openbridge-webcomponents/dist/icons/icon-heatexhanger.js";
import "@oicl/openbridge-webcomponents/dist/icons/icon-heatpump.js";

/* ------------------------------------------------------
 * PIPE ICONS (EXACTLY AS YOU LISTED THEM)
 * ---------------------------------------------------- */
import "@oicl/openbridge-webcomponents/dist/icons/icon-pipe-coming-from.js";
import "@oicl/openbridge-webcomponents/dist/icons/icon-pipe-corner.js";
import "@oicl/openbridge-webcomponents/dist/icons/icon-pipe-cross.js";
import "@oicl/openbridge-webcomponents/dist/icons/icon-pipe-direction.js";
import "@oicl/openbridge-webcomponents/dist/icons/icon-pipe-end-point.js";
import "@oicl/openbridge-webcomponents/dist/icons/icon-pipe-going-to.js";
import "@oicl/openbridge-webcomponents/dist/icons/icon-pipe-overlap.js";
import "@oicl/openbridge-webcomponents/dist/icons/icon-pipe-straight.js";
import "@oicl/openbridge-webcomponents/dist/icons/icon-pipe-threeway.js";

/* ------------------------------------------------------
 * GENERAL ICONS (YOU CONFIRMED THESE EXIST)
 * ---------------------------------------------------- */
import "@oicl/openbridge-webcomponents/dist/icons/icon-temperature.js";
import "@oicl/openbridge-webcomponents/dist/icons/icon-simplified-buoy-safe-water.js";

/* Render App */
createRoot(document.getElementById("root")).render(<App />);