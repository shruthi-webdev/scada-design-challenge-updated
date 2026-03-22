// src/components/ExpandedColdFull.jsx
import React from "react";
import "../styles/expanded-cold.css";
import "../styles/sidebar.css";
import { useState, useEffect } from "react";
import "../styles/theme.css";
import Sidebar from "./Sidebar";
import ValveControlModal from "./ValveControlModal";
import "../styles/valve-modal.css";
import PumpControlModal from "./PumpControlModal";
import "../styles/pump-modal.css";

export default function ExpandedColdFull() {
  const [theme, setTheme] = useState("light");
  const [showBrilliance, setShowBrilliance] = useState(false);
  const [activeValve, setActiveValve] = useState(null);
  const [activePump, setActivePump] = useState(null);

  const openValveModal = (id, label) => setActiveValve({ id, label });
  const closeValveModal = () => setActiveValve(null);
  const openPumpModal = (id, label) => setActivePump({ id, label });
  const closePumpModal = () => setActivePump(null);


  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
    setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      const t = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const d = now.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });

      setTime(t);
      setDate(d);
    };
    updateClock(); // Initial call
    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateScale = () => {
      const screenWidth = window.innerWidth;
      const layoutWidth = 1500;   // same as --scada-real-width
      const scale = screenWidth / layoutWidth;

      document.documentElement.style.setProperty("--scada-scale", scale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const toggleBrillianceMenu = () => {
    setShowBrilliance(prev => !prev);
  };

  


  return (
    <div className="scada-stage">


      {/* top bar */}
      <div class="topbar1">
        <div class="topbarleft">
          <div class="icons"><obi-arrow-left-google></obi-arrow-left-google></div>
          <div class='icons'><obi-arrow-right-google></obi-arrow-right-google></div>
          <div class="icons main-title"><label class="titleicon" >Teknotherm SCADA</label></div>
          <div class="icons sub-title"><span1 class="titleicon">Water System</span1></div>
          <div class="icons"><obi-command-no></obi-command-no></div>
        </div>
        <div class="topbarright">
          <div class="icons1 clock"><span1 class="titleicon">{time}</span1></div>
          <div class="icons1 date"> <label class="titleicon">{date}</label></div>
          <div class="icons1"><obi-alerts-active></obi-alerts-active></div>
          <div class="icons1"><obi-notification-filled></obi-notification-filled></div>
          <div class="icons1"><obi-user></obi-user></div>
          <div className="icons1 brilliance-trigger" onClick={toggleBrillianceMenu}>
            <obi-palette-dimming></obi-palette-dimming>
          </div>
          {showBrilliance && (
            <div className="brilliance-popup" onClick={toggleTheme}>
              <obc-brilliance-menu>
              </obc-brilliance-menu>
            </div>
          )}

          <div class="icons1"><obi-applications></obi-applications></div>
        </div>
      </div>

      {/* New Collapsible Sidebar */}
      <Sidebar />

      {/* main viewport */}

    <div className="scada-wrapper">
      <div className="scada-auto-scale">
        <div className="scada-canvas">
          <section className="panel panel-aux-aft">
            <div className="panel-head">
              <div class="head">AUXILIARY HEAT RECOVER AFT</div>
              <div className="panel-menu">•••</div>
            </div>

            <div className="panel-body">
              <div className="pad1">
                <div class="horline1"><obc-horizontal-line length="18.3"></obc-horizontal-line></div>
                <div class='varline1'><obc-vertical-line length="1.5"></obc-vertical-line></div>
                <div class="horline2"><obc-horizontal-line length="11" ></obc-horizontal-line></div>
                <div class="threevalve1 bridgeicon valve-clickable" onClick={() => openValveModal('AFT_V1', 'AFT Valve 1')}>
                  <obc-valve-analog-three-way-icon slot="icon" value="123" value2="123" horisontal="True"></obc-valve-analog-three-way-icon>
                </div>
                <div class="corner1"><obc-corner-line></obc-corner-line></div>
                <div class="horline3"><obc-horizontal-line length="21.4" ></obc-horizontal-line></div>
                <div class="twovalve1 bridgeicon valve-clickable" onClick={() => openValveModal('AFT_V2', 'AFT Valve 2')}><obc-valve-analog-two-way-icon value="100"></obc-valve-analog-two-way-icon></div>
                <div class='work1'>
                  <label>Open</label>
                </div>
                <div class="twovalve2 bridgeicon valve-clickable" onClick={() => openValveModal('AFT_V3', 'AFT Valve 3')}><obc-valve-analog-two-way-icon value="100"></obc-valve-analog-two-way-icon></div>
                <div class='work2'>
                  <label>Open</label>
                </div>
                <div class="corner2"><obc-corner-line direction="top-left"></obc-corner-line></div>
                <div class='varline2'><obc-vertical-line length="0.5" ></obc-vertical-line></div>
                <div class="dirline1"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="dirline2"><obc-direction-line direction="right"></obc-direction-line></div>
                <div class="dirline3"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="dirline4"><obc-direction-line direction="left" ></obc-direction-line> </div>
                <div class="dig1 digital">
                  <span class="value">00</span>
                  <span class="unit">°C</span>
                  <div class="bottom-line"></div>
                </div>
                <div class="number-control">
                  <div class="row">
                    <span class="arrow1 up">🡱</span>
                    <span class="value1">100</span>
                    <span class="unit1">%</span>
                  </div>

                  <div class="row">
                    <span class="arrow1 down">🡳</span>
                    <span class="value1 dim1">00</span>
                    <span class="unit dim1">%</span>
                  </div>
                </div>
                <div class="mainheat1 exchangers">
                  <div class="subheat1 exchangerin">
                    <div class="slash1"></div>
                    <div class='exchanger1 exchangericon'><obi-heatexhanger ></obi-heatexhanger></div>
                  </div>
                </div>
                <div class="mainheat11 exchangers">
                  <div class="subheat11 exchangerin">
                    <div class="slash11"></div>
                    <div class="slash12"></div>
                    <div class="slash13"></div>
                    <div class="slash14"></div>
                    <div class='exchanger11 exchangericon'><obi-hydraulic-separator></obi-hydraulic-separator></div>
                  </div>
                </div>
                <div class="dig2 digital">
                  <span class="value">00</span>
                  <span class="unit">°C</span>
                  <div class="bottom-line"></div>
                </div>
                <div class="dig3 digital">
                  <span class="value">00</span>
                  <span class="unit">°C</span>
                  <div class="bottom-line"></div>
                </div>
                <div class="dig4 digital">
                  <span class="value">00</span>
                  <span class="unit">°C</span>
                  <div class="bottom-line"></div>
                </div>
                <div class="dirline5"><obc-direction-line direction="right"></obc-direction-line></div>
                <div class="dirline6"><obc-direction-line direction="left" ></obc-direction-line> </div>
                <div class="dirline7"><obc-direction-line direction="left" ></obc-direction-line> </div>
                <div class="dirline8"><obc-direction-line direction="left" ></obc-direction-line> </div>
                <div class="arrowR1"><obi-arrow-right-google></obi-arrow-right-google></div>
                <div class="arrowL1"><obi-arrow-left-google></obi-arrow-left-google></div>
                <div class="corner3"><obc-corner-line direction='bottom-left'></obc-corner-line></div>
                <div class='varline3'><obc-vertical-line length="3.6" ></obc-vertical-line></div>

              </div>
              
            </div>
          </section>

          {/* ---------- TOP LEFT: AUX FWD (below AFT) ---------- */}
          <section className="panel panel-aux-fwd">
            <div className="panel-head">
              <div class="head">AUXILIARY HEAT RECOVER FWD</div>
              <div className="panel-menu">•••</div>
            </div>

            <div className="panel-body">
              <div className="pad1">
                <div class="horline1"><obc-horizontal-line length="22.2"></obc-horizontal-line></div>
                <div class='varline1'><obc-vertical-line length="1.5"></obc-vertical-line></div>
                <div class="horline2"><obc-horizontal-line length="10.7" ></obc-horizontal-line></div>
                <div class="threevalve1 bridgeicon valve-clickable" onClick={() => openValveModal('FWD_V1', 'FWD Valve 1')}>
                  <obc-valve-analog-three-way-icon slot="icon" value="123" value2="123" horisontal="True"></obc-valve-analog-three-way-icon>
                </div>
                <div class="corner1"><obc-corner-line></obc-corner-line></div>
                <div class="horline3"><obc-horizontal-line length="21.2" ></obc-horizontal-line></div>
                <div class="twovalve1 bridgeicon valve-clickable" onClick={() => openValveModal('FWD_V2', 'FWD Valve 2')}><obc-valve-analog-two-way-icon value="100"></obc-valve-analog-two-way-icon></div>
                <div class='work1'>
                  <label>Open</label>
                </div>
                <div class="twovalve2 bridgeicon valve-clickable" onClick={() => openValveModal('FWD_V3', 'FWD Valve 3')}><obc-valve-analog-two-way-icon value="100"></obc-valve-analog-two-way-icon></div>
                <div class='work2'>
                  <label>Open</label>
                </div>
                <div class="corner2"><obc-corner-line direction="top-left"></obc-corner-line></div>
                <div class='varline2'><obc-vertical-line length="0.5" ></obc-vertical-line></div>
                <div class="dirline1"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="dirline2"><obc-direction-line direction="right"></obc-direction-line></div>
                <div class="dirline3"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="dirline4"><obc-direction-line direction="left" ></obc-direction-line> </div>
                <div class="dig1 digital">
                  <span class="value">00</span>
                  <span class="unit">°C</span>
                  <div class="bottom-line"></div>
                </div>
                <div class="number-control">
                  <div class="row">
                    <span class="arrow1 up">🡱</span>
                    <span class="value1">100</span>
                    <span class="unit1">%</span>
                  </div>

                  <div class="row">
                    <span class="arrow1 down">🡳</span>
                    <span class="value1 dim1">00</span>
                    <span class="unit dim1">%</span>
                  </div>
                </div>
                <div class="mainheat1 exchangers">
                  <div class="subheat1 exchangerin">
                    <div class="slash1"></div>
                    <div class='exchanger1 exchangericon'><obi-heatexhanger ></obi-heatexhanger></div>
                  </div>
                </div>
                <div class="mainheat11 exchangers">
                  <div class="subheat11 exchangerin">
                    <div class="slash11"></div>
                    <div class="slash12"></div>
                    <div class="slash13"></div>
                    <div class="slash14"></div>
                    <div class='exchanger11 exchangericon'><obi-hydraulic-separator></obi-hydraulic-separator></div>
                  </div>
                </div>
                <div class="dig2 digital">
                  <span class="value">00</span>
                  <span class="unit">°C</span>
                  <div class="bottom-line"></div>
                </div>
                <div class="dig3 digital">
                  <span class="value">00</span>
                  <span class="unit">°C</span>
                  <div class="bottom-line"></div>
                </div>
                <div class="dig4 digital">
                  <span class="value">00</span>
                  <span class="unit">°C</span>
                  <div class="bottom-line"></div>
                </div>
                <div class="dirline5"><obc-direction-line direction="right"></obc-direction-line></div>
                <div class="dirline6"><obc-direction-line direction="left" ></obc-direction-line> </div>
                <div class="dirline7"><obc-direction-line direction="left" ></obc-direction-line> </div>
                <div class="dirline8"><obc-direction-line direction="left" ></obc-direction-line> </div>
                <div class="arrowR1"><obi-arrow-right-google></obi-arrow-right-google></div>
                <div class="arrowL1"><obi-arrow-left-google></obi-arrow-left-google></div>
                <div class="corner33"><obc-corner-line direction="top-left"></obc-corner-line></div>
                <div class='varline33'><obc-vertical-line length="8.5"></obc-vertical-line></div>
                <div class="corner34"><obc-corner-line direction="bottom-right"></obc-corner-line></div>
    
              </div>

            </div>
          </section>

          {/* ---------- LEFT MIDDLE BLOCKS ---------- */}
          <section className="panel panel-secondary">
            <div className="panel-head">
              <div class="head">SECONDARY</div><div className="panel-menu">•••</div>
            </div>
            <div className="panel-body">
              <div className="pid small">
                <div class="horpump1 verpump bridgeicon pump-clickable" onClick={() => openPumpModal('SEC1', 'SEC-01')}><obi-pump-on-vertical on='True' vertical='False' ></obi-pump-on-vertical></div>
                <div class="pumpvalve">
                  <span class="pumpperc">10</span>
                  <span class="pumpunit">%</span>
                </div>
                <div class="horpump2 verpump bridgeicon pump-clickable" onClick={() => openPumpModal('SEC2', 'SEC-02')}><obi-pump-on-vertical on='True' vertical='False' ></obi-pump-on-vertical></div>
                <div class="pumpvalve1">
                  <span class="pumpperc">10</span>
                  <span class="pumpunit">%</span>
                </div>
                <div class="secline1"><obc-horizontal-line length="0.5" ></obc-horizontal-line></div>
                <div class="secline2"><obc-horizontal-line length="0.5" ></obc-horizontal-line></div>
                <div class="seccon1"><obc-corner-line direction='bottom-right'></obc-corner-line></div>
                <div class="seccon2"><obc-corner-line direction='top-right'></obc-corner-line></div>
                <div class='secline3'><obc-vertical-line length="1" ></obc-vertical-line></div>
                <div class="secline4"><obc-horizontal-line length="0.5" ></obc-horizontal-line></div>
                <div class="secline5"><obc-horizontal-line length="0.5" ></obc-horizontal-line></div>
                <div class="seccon3"><obc-corner-line direction='bottom-left'></obc-corner-line></div>
                <div class="seccon4"><obc-corner-line direction='top-left'></obc-corner-line></div>
                <div class='secline6'><obc-vertical-line length="1" ></obc-vertical-line></div>
                <div class='secline7'><obc-vertical-line length="3" ></obc-vertical-line></div>
                <div class="secline8"><obc-horizontal-line length="1.5" ></obc-horizontal-line></div>
                <div class="seccon5"><obc-corner-line direction='top-right'></obc-corner-line></div>
                <div class="seccon6"><obc-corner-line direction='bottom-right'></obc-corner-line></div>
                <div class="secline9"><obc-horizontal-line length="9.4" ></obc-horizontal-line></div>
                <div class="secline10"><obc-horizontal-line length="26.9"></obc-horizontal-line></div>
                <div class='secline11'><obc-vertical-line length="5.5" ></obc-vertical-line></div>
                <div class="seccon7"><obc-corner-line direction='top-right'></obc-corner-line></div>
                <div class="secline12"><obc-horizontal-line length="26"></obc-horizontal-line></div>
                <div class='secline13'><obc-vertical-line length="4.6" ></obc-vertical-line></div>
                <div class='secline14'><obc-vertical-line length="9.8" ></obc-vertical-line></div>
                <div class="seccon8"><obc-corner-line direction='top-left'></obc-corner-line></div>
                <div class="seccon9"><obc-corner-line direction='bottom-right'></obc-corner-line></div>

              </div>
            </div>
          </section>
          <section className="panel panel-recovery">
            <div className="panel-head">
              <div class="head">RECOVERY</div><div className="panel-menu">•••</div>
            </div>
            <div className="panel-body">
              <div className="pid small">
                <div class='recvalve1 bridgeicon valve-clickable' onClick={() => openValveModal('REC_V1', 'Recovery Valve 1')}><obc-valve-analog-three-way-icon  value="123" value2="123" horisontal="True"></obc-valve-analog-three-way-icon></div>
                <div class="corner4"><obc-corner-line direction='bottom-top'></obc-corner-line></div>
                <div class="recline1"><obc-horizontal-line length="3.4" ></obc-horizontal-line></div>
                <div class="corner5"><obc-corner-line direction='bottom-left'></obc-corner-line></div>
                <div class='recline2'><obc-vertical-line length="0.5" ></obc-vertical-line></div>
                <div class='recline3'><obc-vertical-line length="0.5" ></obc-vertical-line></div>
                <div class="corner6"><obc-corner-line direction='top-left'></obc-corner-line></div>
                <div class="number-control1">
                  <div class="row">
                    <span class="arrow1 up">🡱</span>
                    <span class="value1">100</span>
                    <span class="unit1">%</span>
                  </div>

                  <div class="row">
                    <span class="arrow1 down">🡳</span>
                    <span class="value1 dim1">00</span>
                    <span class="unit dim1">%</span>
                  </div>
                </div>
                <div class="recdir1"><obc-direction-line direction="right"></obc-direction-line></div>
                <div class="recdir2"><obc-direction-line direction="right"></obc-direction-line></div>
                <div class="recline4"><obc-horizontal-line length="2.5" ></obc-horizontal-line></div>
                <div class="recdir3"><obc-direction-line direction="right"></obc-direction-line></div>
                <div class="corner7"><obc-corner-line direction='bottom-left'></obc-corner-line></div>
                <div class='recline5'><obc-vertical-line length="4.9" ></obc-vertical-line></div>
                <div class="recline6"><obc-horizontal-line length="26" ></obc-horizontal-line></div>
                <div class="corner8"><obc-corner-line direction='top-left'></obc-corner-line></div>
                <div class="corner9"><obc-corner-line direction='bottom-right'></obc-corner-line></div>
              
              </div>
            </div>
          </section>

          <section className="panel panel-primarypump">
            <div className="panel-head">
              <div class="head">PRIMARY PUMP</div><div className="panel-menu">•••</div>
            </div>
            <div className="panel-body">
              <div className="pid small">
                  <div class="primpump1 verpump bridgeicon pump-clickable" onClick={() => openPumpModal('PRI1', 'PRI-01')}><obi-pump-on-vertical on='True' vertical='False' ></obi-pump-on-vertical></div>
                  <div class="pumpvalve11">
                    <span class="pumpperc">10</span>
                    <span class="pumpunit">%</span>
                  </div>
                  <div class="primpump2 verpump bridgeicon pump-clickable" onClick={() => openPumpModal('PRI2', 'PRI-02')}><obi-pump-on-vertical on='True' vertical='False' ></obi-pump-on-vertical></div>
                  <div class="pumpvalve12">
                    <span class="pumpperc">10</span>
                    <span class="pumpunit">%</span>
                  </div>
                <div class="primline1"><obc-horizontal-line length="0.5" ></obc-horizontal-line></div>
                <div class="primline2"><obc-horizontal-line length="0.5" ></obc-horizontal-line></div>
                <div class="primcon1"><obc-corner-line direction='bottom-right'></obc-corner-line></div>
                <div class="primcon2"><obc-corner-line direction='top-right'></obc-corner-line></div>
                <div class='primline3'><obc-vertical-line length="1.3" ></obc-vertical-line></div>
                <div class="primline4"><obc-horizontal-line length="0.5" ></obc-horizontal-line></div>
                <div class="primline5"><obc-horizontal-line length="0.5" ></obc-horizontal-line></div>
                <div class="primcon3"><obc-corner-line direction='bottom-left'></obc-corner-line></div>
                <div class="primcon4"><obc-corner-line direction='top-left'></obc-corner-line></div>
                <div class='primline6'><obc-vertical-line length="1.3" ></obc-vertical-line></div>
                <div class="primline7"><obc-horizontal-line length="5" ></obc-horizontal-line></div>
                <div class="mainheat31 exchangers">
                  <div class="subheat11 exchangerin">
                    <div class="slash11"></div>
                    <div class="slash12"></div>
                    <div class="slash13"></div>
                    <div class="slash14"></div>
                    <div class='exchanger11 exchangericon'><obi-hydraulic-separator></obi-hydraulic-separator></div>
                  </div>
                </div>
                <div class="primdir1"><obc-direction-line direction="right"></obc-direction-line></div>
                <div class="primdir2"><obc-direction-line direction="left"></obc-direction-line></div>
                <div class="primdir3"><obc-direction-line direction="right"></obc-direction-line></div>
                <div class="primdir4"><obc-direction-line direction="left"></obc-direction-line></div>
                <div class="primdir5"><obc-direction-line direction="right"></obc-direction-line></div>
                <div class="primdir6"><obc-direction-line direction="right"></obc-direction-line></div>
                <div class="primdig1 digital">
                  <span class="value">00</span>
                  <span class="unit">°C</span>
                  <div class="bottom-line"></div>
                </div>
                <div class="primdig2 digital">
                  <span class="value">00</span>
                  <span class="unit">°C</span>
                  <div class="bottom-line"></div>
                </div>
            
              </div>
            </div>
          </section>

          <section className="panel panel-selection">
            <div className="panel-head">
              <div class="head">SELECTION</div><div className="panel-menu">•••</div>
            </div>
            <div className="panel-body">
              <div className="pid small">
                <div class='selvalve1 bridgeicon valve-clickable' onClick={() => openValveModal('SEL_V1', 'Selection Valve 1')}><obc-valve-analog-three-way-icon  value="123" value2="123" horisontal="True"></obc-valve-analog-three-way-icon></div>
                <div class='selline1'><obc-vertical-line length="0.5" ></obc-vertical-line></div>
                <div class='selline2'><obc-vertical-line length="0.5" ></obc-vertical-line></div>
                <div class="selcorner1"><obc-corner-line direction='bottom-right'></obc-corner-line></div>
                <div class="selcorner2"><obc-corner-line direction='top-right'></obc-corner-line></div>
                <div class="selline3"><obc-horizontal-line length="5.5" ></obc-horizontal-line></div>
                <div class="selline4"><obc-horizontal-line length="4.8" ></obc-horizontal-line></div>
                <div class="selline5"><obc-horizontal-line length="1.2" ></obc-horizontal-line></div>
                <div class="sel-control1">
                  <div class="row">
                    <span class="arrow1 up">🡱</span>
                    <span class="value1">100</span>
                    <span class="unit1">%</span>
                  </div>

                  <div class="row">
                    <span class="arrow1 down">🡳</span>
                    <span class="value1 dim1">00</span>
                    <span class="unit dim1">%</span>
                  </div>
                </div>
                <div class="seldir1"><obc-direction-line direction="left"></obc-direction-line></div>
                <div class="seldir2"><obc-direction-line direction="left"></obc-direction-line></div>
                <div class="selcorner3"><obc-corner-line direction='bottom-left'></obc-corner-line></div>
                <div class="selcorner4"><obc-corner-line direction='bottom-left'></obc-corner-line></div>
                <div class="selcorner5"><obc-corner-line direction='bottom-left'></obc-corner-line></div>
                <div class="selcorner6"><obc-corner-line direction='top-right'></obc-corner-line></div>
                
              </div>
            </div>
          </section>

          {/* ---------- LEFT BOTTOM: HEAT DUMPING ---------- */}
          <section className="panel panel-heat-dumping">
            <div className="panel-head">
              <div class="head">HEAT DUMPING</div><div className="panel-menu">•••</div>
            </div>
            <div className="panel-body">
              <div className="pid">
                <div class="dumpline1"><obc-horizontal-line length="25" ></obc-horizontal-line></div>
                <div class="dumpline2"><obc-horizontal-line length="13.5" ></obc-horizontal-line></div>
                <div class="dumpheat1 exchangers">
                  <div class="subheat1 exchangerin">
                    <div class="slash1"></div>
                    <div class='exchanger1 exchangericon'><obi-heatexhanger ></obi-heatexhanger></div>
                  </div>
                </div>
                <div class='dumpvalve1 bridgeicon valve-clickable' onClick={() => openValveModal('DMP_V1', 'Dump Valve 1')}><obc-valve-analog-three-way-icon  value="123" value2="123" horisontal="True"></obc-valve-analog-three-way-icon></div>
                <div class='dumpline3'><obc-vertical-line length="1.3"></obc-vertical-line></div>
                <div class="dumpcorner1"><obc-corner-line direction="top-right"></obc-corner-line></div>
                <div class="dumpline4"><obc-horizontal-line length="14.4" ></obc-horizontal-line></div>
                <div class="dumpR1"><obi-arrow-right-google></obi-arrow-right-google></div>
                <div class="dumpL1"><obi-arrow-left-google></obi-arrow-left-google></div>
                <div class="dumppump1 verpump bridgeicon pump-clickable" onClick={() => openPumpModal('DMP1', 'DMP-01')}><obi-pump-on-vertical on='True' vertical='False' ></obi-pump-on-vertical></div>
                  <div class="dumpvalve11">
                    <label class="work1">On</label>
                  </div>
                <div class="dumpdig1 digital">
                  <span class="value">00</span>
                  <span class="unit">°C</span>
                  <div class="bottom-line"></div>
                </div>
                <div class="dumpdig2 digital">
                  <span class="value">00</span>
                  <span class="unit">°C</span>
                  <div class="bottom-line"></div>
                </div>
                <div class="dumpdig3 digital">
                  <span class="value">00</span>
                  <span class="unit">°C</span>
                  <div class="bottom-line"></div>
                </div>
                <div class="dumpdig4 digital">
                  <span class="value">00</span>
                  <span class="unit">°C</span>
                  <div class="bottom-line"></div>
                </div>
                <div class="dump-control1">
                  <div class="row">
                    <span class="arrow1 up">🡱</span>
                    <span class="value1">100</span>
                    <span class="unit1">%</span>
                  </div>

                  <div class="row">
                    <span class="arrow1 down">🡳</span>
                    <span class="value1 dim1">00</span>
                    <span class="unit dim1">%</span>
                  </div>
                </div>
                <div class="dumpdir1"><obc-direction-line direction="left" ></obc-direction-line></div>
                <div class="dumpdir2"><obc-direction-line direction="left" ></obc-direction-line></div>
                <div class="dumpdir3"><obc-direction-line direction="left" ></obc-direction-line></div>
                <div class="dumpdir4"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="dumpdir5"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="dumpdir6"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="dumpdir7"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="dumpcorner2"><obc-corner-line direction="top-left"></obc-corner-line></div>
                <div class="dumpcorner3"><obc-corner-line direction="top-right"></obc-corner-line></div>
                <div class='dumpline5'><obc-vertical-line length="3"></obc-vertical-line></div>
                <div class='dumpline6'><obc-vertical-line length="5"></obc-vertical-line></div>
                <div class="dumpline7"><obc-horizontal-line length="1.7" ></obc-horizontal-line></div>
                <div class='dumpline8'><obc-vertical-line length="2.5"></obc-vertical-line></div>
                <div class="dumpcorner4"><obc-corner-line direction="bottom-right"></obc-corner-line></div>
                <div class="dumpline9"><obc-horizontal-line length="1" ></obc-horizontal-line></div>

              </div>
            </div>
          </section>

          {/* ---------- CENTER CONTROL (tall card) ---------- */}
          <aside className="panel control-column">
            <div className="panel-head"><div></div></div>
            <div className="panel-body control-body">
              <div className="panel22">
                <div class='centerline1'><obc-horizontal-line length="2" ></obc-horizontal-line></div>
                <div class='centerline2'><obc-horizontal-line length="1.1" ></obc-horizontal-line></div>
                <div class='centerline3'><obc-horizontal-line length="8.3" ></obc-horizontal-line></div>
                <div class='centerline4'><obc-horizontal-line length="14.4" ></obc-horizontal-line></div>
                <div class="cencorner1"><obc-corner-line direction='bottom-left'></obc-corner-line></div>
                <div class="cencorner2"><obc-corner-line direction='bottom-left'></obc-corner-line></div>
                <div class="cedir1"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="cedir2"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="cedir3"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="cedir4"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="cedir5"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="cedir6"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="cedir7"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="cedir8"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="cedir9"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="cedir10"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="cedir11"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="cedir12"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="borderbutton1">
                  <div class="borderone1">
                    <div class="insideone"><obi-heat-google></obi-heat-google></div>
                    <label class="insideon">Hot Water con</label>
                  </div>
                </div>
                <div class="borderbutton2">
                  <div class="borderone2">
                    <div class="insideone"><obi-cold-google></obi-cold-google></div>
                    <label class="insideon">Cold Water con</label>
                  </div>
                </div>

                    <div className="section-title">TEMP. READOUTS</div>

                    <div className="row1">
                      <span className="icon">00°</span>
                      <span className="label11">Seawater C</span>
                    </div>

                    <div className="row1">
                      <span className="icon">00°</span>
                      <span className="label11">Outdoor C</span>
                    </div>

                    <div className="row1">
                      <span className="icon">00°</span>
                      <span className="label11">Warm water S. C</span>
                    </div>

                    <div className="row1">
                      <span className="icon">00°</span>
                      <span className="label11">Cold water S. C</span>
                    </div>

                    <div className="section-title">SET POINTS</div>

                    <div className="row1">
                      <span className="arrow">►</span>
                      <span className="iconar">00</span>
                      <span className="label11">Warm water C C</span>
                    </div>

                    <div className="row1">
                      <span className="arrow">►</span>
                      <span className="iconar">00</span>
                      <span className="label11">Cold water C C</span>
                    </div>

                    <div className="section-title">OPERATIONS</div>

                    <div className="toggle-row">
                      <span className="label1">Enable System</span>
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="toggle-row">
                      <span className="label1">Full auto</span>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                      </label>
                    </div>

                  </div>
            </div>
            <div class="btn11">
              <div class="outbtn1">
                <div class="inbtn1">
                  <div>
                    <div class="inheat"><obi-heat-google></obi-heat-google></div>
                    <div class="incold"><obi-cold-google></obi-cold-google></div>
                    <div class='inpump'><obi-heatpump></obi-heatpump></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn12">
              <div class="outbtn1">
                <div class="inbtn1">
                  <div>
                    <div class="inheat"><obi-heat-google></obi-heat-google></div>
                    <div class="incold"><obi-cold-google></obi-cold-google></div>
                    <div class='inpump'><obi-heatpump></obi-heatpump></div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ---------- RIGHT COLUMN: MIXING / PRIMARY / FREE COOL ---------- */}
          <section className="panel panel-mixing">
            <div className="panel-head"><div class="head">MIXING</div><div className="panel-menu">•••</div></div>
            <div className="panel-body">
              <div className="pid">
                <div class='mixvalve1 bridgeicon valve-clickable' onClick={() => openValveModal('MIX_V1', 'Mixing Valve 1')}><obc-valve-analog-three-way-icon  value="123" value2="123" horisontal="True"></obc-valve-analog-three-way-icon></div>
                <div class="mixline1"><obc-horizontal-line length="5.6" ></obc-horizontal-line></div>
                <div class="mixline2"><obc-horizontal-line length="7.2" ></obc-horizontal-line></div>
                <div class='mixline3'><obc-vertical-line length="1"></obc-vertical-line></div>
                <div class="mixcorner1"><obc-corner-line direction="top-left"></obc-corner-line></div>
                <div class="mixcorner2"><obc-corner-line direction="bottom-right"></obc-corner-line></div>
                <div class="mixcorner3"><obc-corner-line direction="bottom-right"></obc-corner-line></div>
                <div class='mixline4'><obc-vertical-line length="4"></obc-vertical-line></div>
                <div class='mixline5'><obc-vertical-line length="3.1"></obc-vertical-line></div>
                <div class="mixcorner4"><obc-corner-line direction="top-right"></obc-corner-line></div>
                <div class="mixcorner5"><obc-corner-line direction="top-right"></obc-corner-line></div>
                <div class='mixline6'><obc-vertical-line length="4.6"></obc-vertical-line></div>
                <div class='mixline7'><obc-vertical-line length="6.8"></obc-vertical-line></div>
                <div class="mix-control1">
                  <div class="row">
                    <span class="arrow1 up">🡱</span>
                    <span class="value1">100</span>
                    <span class="unit1">%</span>
                  </div>

                  <div class="row">
                    <span class="arrow1 down">🡳</span>
                    <span class="value1 dim1">00</span>
                    <span class="unit dim1">%</span>
                  </div>
                </div>
                <div class="mixdir1"><obc-direction-line direction="right"></obc-direction-line></div>
                <div class="mixdir2"><obc-direction-line direction="right"></obc-direction-line></div>
                <div class="mixdir3"><obc-direction-line direction="right"></obc-direction-line></div>
                <div class="mixdir4"><obc-direction-line direction="right"></obc-direction-line></div>
                <div class="mixdir5"><obc-direction-line direction="right"></obc-direction-line></div>
              </div>
            </div>
          </section>
          <section className="panel panel-right-secondary">
            <div className="panel-head"><div class="head">SECONDARY</div><div className="panel-menu">•••</div></div>
            <div className="panel-body">
              <div className="pid">
                <div class="seconpump1 verpump bridgeicon pump-clickable" onClick={() => openPumpModal('RS1', 'RS-01')}><obi-pump-on-vertical on='True' vertical='False' ></obi-pump-on-vertical></div>
                <div class="seconvalve">
                  <span class="pumpperc">10</span>
                  <span class="pumpunit">%</span>
                </div>
                <div class="seconpump2 verpump bridgeicon pump-clickable" onClick={() => openPumpModal('RS2', 'RS-02')}><obi-pump-on-vertical on='True' vertical='False' ></obi-pump-on-vertical></div>
                <div class="seconvalve1">
                  <span class="pumpperc">10</span>
                  <span class="pumpunit">%</span>
                </div>
                <div class="seconline1"><obc-horizontal-line length="0.5" ></obc-horizontal-line></div>
                <div class="seconline2"><obc-horizontal-line length="0.5" ></obc-horizontal-line></div>
                <div class="seconcon1"><obc-corner-line direction='bottom-right'></obc-corner-line></div>
                <div class="seconcon2"><obc-corner-line direction='top-right'></obc-corner-line></div>
                <div class='seconline3'><obc-vertical-line length="1" ></obc-vertical-line></div>
                <div class="seconline4"><obc-horizontal-line length="0.5" ></obc-horizontal-line></div>
                <div class="seconline5"><obc-horizontal-line length="0.5" ></obc-horizontal-line></div>
                <div class="seconcon3"><obc-corner-line direction='bottom-left'></obc-corner-line></div>
                <div class="seconcon4"><obc-corner-line direction='top-left'></obc-corner-line></div>
                <div class='seconline6'><obc-vertical-line length="1" ></obc-vertical-line></div>
                <div class="seconline7"><obc-horizontal-line length="1.5" ></obc-horizontal-line></div>
                <div class="seconcon5"><obc-corner-line direction='top-left'></obc-corner-line></div>
                <div class="secondir1"><obc-direction-line direction="right"></obc-direction-line></div>
                <div class="secondir2"><obc-direction-line direction="right"></obc-direction-line></div>
              </div>
            </div>
          </section>

          <section className="panel panel-right-primary">
            <div className="panel-head"><div class="head">PRIMARY PUMP</div><div className="panel-menu">•••</div></div>
            <div className="panel-body">
              <div className="pid small">
                <div class="primapump1 verpump bridgeicon pump-clickable" onClick={() => openPumpModal('RP1', 'RP-01')}><obi-pump-on-vertical on='True' vertical='False' ></obi-pump-on-vertical></div>
                <div class="pumpavalve11">
                    <label class="work1">On</label>
                </div>
                <div class="primapump2 verpump bridgeicon pump-clickable" onClick={() => openPumpModal('RP2', 'RP-02')}><obi-pump-on-vertical on='True' vertical='False' ></obi-pump-on-vertical></div>
                  <div class="pumpavalve12">
                    <label class="work1">On</label>
                  </div>
                <div class="primaline1"><obc-horizontal-line length="0.5" ></obc-horizontal-line></div>
                <div class="primaline2"><obc-horizontal-line length="0.5" ></obc-horizontal-line></div>
                <div class="primacon1"><obc-corner-line direction='bottom-right'></obc-corner-line></div>
                <div class="primacon2"><obc-corner-line direction='top-right'></obc-corner-line></div>
                <div class='primaline3'><obc-vertical-line length="1" ></obc-vertical-line></div>
                <div class="primaline4"><obc-horizontal-line length="0.5" ></obc-horizontal-line></div>
                <div class="primaline5"><obc-horizontal-line length="0.5" ></obc-horizontal-line></div>
                <div class="primacon3"><obc-corner-line direction='bottom-left'></obc-corner-line></div>
                <div class="primacon4"><obc-corner-line direction='top-left'></obc-corner-line></div>
                <div class='primaline6'><obc-vertical-line length="1" ></obc-vertical-line></div>
                <div class="primaline7"><obc-horizontal-line length="5.9" ></obc-horizontal-line></div>
                <div class="primacon5"><obc-corner-line direction='top-left'></obc-corner-line></div>
                <div class="mainheat41 exchangers">
                  <div class="subheat11 exchangerin">
                    <div class="slash11"></div>
                    <div class="slash12"></div>
                    <div class="slash13"></div>
                    <div class="slash14"></div>
                    <div class='exchanger11 exchangericon'><obi-hydraulic-separator></obi-hydraulic-separator></div>
                  </div>
                </div>
                <div class="primadir1"><obc-direction-line direction="right"></obc-direction-line></div>
                <div class="primadir2"><obc-direction-line direction="left"></obc-direction-line></div>
                <div class="primadir3"><obc-direction-line direction="right"></obc-direction-line></div>
                <div class="primadir4"><obc-direction-line direction="left"></obc-direction-line></div>
                <div class="primadir5"><obc-direction-line direction="right"></obc-direction-line></div>
                <div class="primadir6"><obc-direction-line direction="right"></obc-direction-line></div>
                <div class="primadig1 digital">
                  <span class="value">00</span>
                  <span class="unit">°C</span>
                  <div class="bottom-line"></div>
                </div>
                <div class="primadig2 digital">
                  <span class="value">00</span>
                  <span class="unit">°C</span>
                  <div class="bottom-line"></div>
                </div>
                <div class="primaline8"><obc-horizontal-line length="7.2" ></obc-horizontal-line></div>
                <div class="primaline9"><obc-horizontal-line length="19.4" ></obc-horizontal-line></div>
                <div class="primacon6"><obc-corner-line direction='top-left'></obc-corner-line></div>
                <div class="primaline10"><obc-horizontal-line length="18.8" ></obc-horizontal-line></div>
                <div class='primaline11'><obc-vertical-line length="2.8" ></obc-vertical-line></div>
                <div class="primacon7"><obc-corner-line direction='bottom-left'></obc-corner-line></div>
                <div class="primaline12"><obc-horizontal-line length="19.8" ></obc-horizontal-line></div>
                <div class="primacon8"><obc-corner-line direction='bottom-left'></obc-corner-line></div>
                <div class='primaline13'><obc-vertical-line length="6" ></obc-vertical-line></div>
              
              </div>
            </div>
          </section>
          <section className="panel panel-right-selection">
            <div className="panel-head"><div class="head">SELECTION</div><div className="panel-menu">•••</div></div>
            <div className="panel-body">
              <div className="pid small">
                <div class='seleline1'><obc-vertical-line length="1" ></obc-vertical-line></div>
                <div class='seleline2'><obc-vertical-line length="1" ></obc-vertical-line></div>
                <div class="selecorner1"><obc-corner-line direction='bottom-left'></obc-corner-line></div>
                <div class="selecorner2"><obc-corner-line direction='top-left'></obc-corner-line></div>
                <div class="seleline3"><obc-horizontal-line length="4.1" ></obc-horizontal-line></div>
                <div class="seleline4"><obc-horizontal-line length="3.2" ></obc-horizontal-line></div>
                <div class="selevalve1 bridgeicon valve-clickable" onClick={() => openValveModal('RSL_V1', 'R-Selection Valve 1')}><obc-valve-analog-two-way-icon value="100"></obc-valve-analog-two-way-icon></div>
                <div class="selecorner3"><obc-corner-line direction='bottom-right'></obc-corner-line></div>
                <div class='seleline5'><obc-vertical-line length="4.8" ></obc-vertical-line></div>
                <div class="selecorner4"><obc-corner-line direction='top-left'></obc-corner-line></div>
                <div class="seleline6"><obc-horizontal-line length="1.3" ></obc-horizontal-line></div>
                <div class="selevalve11">
                    <label class="work1">Open</label>
                </div>
                <div class="selevalve2 bridgeicon valve-clickable" onClick={() => openValveModal('RSL_V2', 'R-Selection Valve 2')}><obc-valve-analog-two-way-icon value="100"></obc-valve-analog-two-way-icon></div>
                <div class="selevalve12">
                    <label class="work1">Open</label>
                  </div>
                <div class="seledir1"><obc-direction-line direction="left"></obc-direction-line></div>
                <div class="seledir2"><obc-direction-line direction="left"></obc-direction-line></div>
                <div class="seledir3"><obc-direction-line direction="left"></obc-direction-line></div>
                  
              </div>
            </div>
          </section>

          <section className="panel panel-freecool">
            <div className="panel-head"><div class="head">FREE COOLING AND HEAT COLLECTION</div><div className="panel-menu">•••</div></div>
            <div className="panel-body">
              <div className="pid">
                <div class="freeline1"><obc-horizontal-line length="18.2" ></obc-horizontal-line></div>
                <div class="freecorner2"><obc-corner-line direction="top-right"></obc-corner-line></div>
                <div class="freecorner3"><obc-corner-line direction="bottom-right"></obc-corner-line></div>
                <div class="freeline2"><obc-horizontal-line length="13.5" ></obc-horizontal-line></div>
                <div class="freeheat1 exchangers">
                  <div class="subheat1 exchangerin">
                    <div class="slash1"></div>
                    <div class='exchanger1 exchangericon'><obi-heatexhanger ></obi-heatexhanger></div>
                  </div>
                </div>
                <div class='freevalve1 bridgeicon valve-clickable' onClick={() => openValveModal('FRE_V1', 'Free Cool Valve 1')}><obc-valve-analog-three-way-icon  value="123" value2="123" horisontal="True"></obc-valve-analog-three-way-icon></div>
                <div class='freeline3'><obc-vertical-line length="1.3"></obc-vertical-line></div>
                <div class="freecorner1"><obc-corner-line direction="top-left"></obc-corner-line></div>
                <div class="freeline4"><obc-horizontal-line length="7.8" ></obc-horizontal-line></div>
                <div class="freeR1"><obi-arrow-right-google></obi-arrow-right-google></div>
                <div class="freeL1"><obi-arrow-left-google></obi-arrow-left-google></div>
                <div class="freepump1 verpump bridgeicon pump-clickable" onClick={() => openPumpModal('FRE1', 'FRE-01')}><obi-pump-on-vertical on='True' vertical='False' ></obi-pump-on-vertical></div>
                <div class='freeline5'><obc-vertical-line length="3"></obc-vertical-line></div>
                <div class='freeline6'><obc-vertical-line length="2.5"></obc-vertical-line></div>
                <div class="freecorner4"><obc-corner-line direction="bottom-left"></obc-corner-line></div>
                <div class="freeline7"><obc-horizontal-line length="1.3" ></obc-horizontal-line></div>
                <div class='freeline8'><obc-vertical-line length="5.3"></obc-vertical-line></div>
                <div class="freecorner5"><obc-corner-line direction="bottom-right"></obc-corner-line></div>
                <div class="freecorner6"><obc-corner-line direction="top-left"></obc-corner-line></div>
                <div class="freeline9"><obc-horizontal-line length="1.7" ></obc-horizontal-line></div>
                <div class="freevalve11">
                    <label class="work1">On</label>
                </div>
                <div class="freedig1 digital">
                  <span class="value">00</span>
                  <span class="unit">°C</span>
                  <div class="bottom-line"></div>
                </div>
                <div class="freedig2 digital">
                  <span class="value">00</span>
                  <span class="unit">°C</span>
                  <div class="bottom-line"></div>
                </div>
                <div class="freedig3 digital">
                  <span class="value">00</span>
                  <span class="unit">°C</span>
                  <div class="bottom-line"></div>
                </div>
                <div class="freedig4 digital">
                  <span class="value">00</span>
                  <span class="unit">°C</span>
                  <div class="bottom-line"></div>
                </div>
                <div class="free-control1">
                  <div class="row">
                    <span class="arrow1 up">🡱</span>
                    <span class="value1">100</span>
                    <span class="unit1">%</span>
                  </div>

                  <div class="row">
                    <span class="arrow1 down">🡳</span>
                    <span class="value1 dim1">00</span>
                    <span class="unit dim1">%</span>
                  </div>
                </div>
                <div class="freedir1"><obc-direction-line direction="left" ></obc-direction-line></div>
                <div class="freedir2"><obc-direction-line direction="left" ></obc-direction-line></div>
                <div class="freedir3"><obc-direction-line direction="left" ></obc-direction-line></div>
                <div class="freedir4"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="freedir5"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="freedir6"><obc-direction-line direction="right" ></obc-direction-line></div>
                <div class="freedir7"><obc-direction-line direction="right" ></obc-direction-line></div>
                
              </div>
            </div>
          </section>

          {/* ---------- CENTER BOTTOM exchangers ---------- */}
      

          {/* ---------- BOTTOM RUN (long) ---------- */} 







        </div>
      </div>
    </div>

      {/* Valve Control Modal */}
      <ValveControlModal
        isOpen={activeValve !== null}
        onClose={closeValveModal}
        valveId={activeValve?.id || ''}
        valveLabel={activeValve?.label || ''}
      />

      {/* Pump Control Modal */}
      <PumpControlModal
        isOpen={activePump !== null}
        onClose={closePumpModal}
        pumpId={activePump?.id || ''}
        pumpLabel={activePump?.label || ''}
      />
      
    </div>
  );
}