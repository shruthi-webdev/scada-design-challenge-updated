import React, { useState, useEffect } from "react";
import "../styles/sidebar.css";

const iconMap = {
  "obi-dashboard": <obi-dashboard></obi-dashboard>,
  "obi-diagnostic-google": <obi-diagnostic-google></obi-diagnostic-google>,
  "obi-alarm-acknowledged-iec": <obi-alarm-acknowledged-iec></obi-alarm-acknowledged-iec>,
  "obi-own-ship-iec": <obi-own-ship-iec></obi-own-ship-iec>,
  "obi-propulsion-static": <obi-propulsion-static></obi-propulsion-static>,
  "obi-wrench": <obi-wrench></obi-wrench>,
  "obi-engine-fill": <obi-engine-fill></obi-engine-fill>,
  "obi-battery-vertical-empty": <obi-battery-vertical-empty></obi-battery-vertical-empty>,
  "obi-alert-list": <obi-alert-list></obi-alert-list>,
  "obi-settings-iec": <obi-settings-iec></obi-settings-iec>,
};

export default function Sidebar({ setCurrentPage }) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Update a CSS variable on the root element
    const stage = document.querySelector(".scada-stage");
    if (stage) {
      stage.setAttribute("data-sidebar", isExpanded ? "expanded" : "collapsed");
    }
  }, [isExpanded]);

  const menuItems = [
    { id: 1, label: "Dashboard", icon: "obi-dashboard" },
    { id: 2, label: "Analytics", icon: "obi-diagnostic-google" },
    { id: 3, label: "Devices", icon: "obi-alarm-acknowledged-iec" },
    { id: 4, label: "Table", icon: "obi-own-ship-iec" },
    { id: 5, label: "GA", icon: "obi-propulsion-static" },
    { id: 6, label: "Water", icon: "obi-propulsion-static" },
    { id: 7, label: "Transfer", icon: "obi-wrench" },
    { id: 8, label: "AC", icon: "obi-engine-fill" },
    { id: 9, label: "AC", icon: "obi-alarm-acknowledged-iec" },
    { id: 10, label: "Technical rooms", icon: "obi-alarm-acknowledged-iec" },
    { id: 11, label: "Engine room", icon: "obi-battery-vertical-empty" },
    { id: 12, label: "Provision plant", icon: "obi-battery-vertical-empty" },
    { id: 13, label: "Cardeck", icon: "obi-alert-list" },
    { id: 14, label: "Battery AFT", icon: "obi-settings-iec" },
    { id: 15, label: "Battery FWD", icon: "obi-alert-list" },
  ];

  const bottomItems = [
    { id: 16, label: "Alerts", icon: "obi-alert-list" },
  ];

  return (
    <div className={`sidebar-container ${isExpanded ? "expanded" : "collapsed"}`}>
      {/* Hamburger Menu Button */}
      <div className="sidebar-header">
        <button
          className="hamburger-menu"
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? "Collapse" : "Expand"}
        >
          <obi-menu-iec></obi-menu-iec>
        </button>
      </div>

      {/* Main Menu Items */}
      <div className="sidebar-content">
        <div className="menu-items">
          {menuItems.map((item) => (
            <div key={item.id} className={`menu-item ${item.label === 'Table' ? 'active' : ''}`} onClick={() => { 
              if (setCurrentPage) {
                if (item.label === 'Table') setCurrentPage('table');
                else setCurrentPage('dashboard');
              }
            }}>
              <div className="menu-icon">
                {iconMap[item.icon]}
              </div>
              {isExpanded && <span className="menu-label">{item.label}</span>}
            </div>
          ))}
        </div>

        {/* Bottom Menu Items */}
        <div className="bottom-items">
          {bottomItems.map((item) => (
            <div key={item.id} className="menu-item" onClick={() => { if (item.label === 'Alerts' && setCurrentPage) setCurrentPage('alerts'); }}>
              <div className="menu-icon">
                {iconMap[item.icon]}
              </div>
              {isExpanded && <span className="menu-label">{item.label}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
