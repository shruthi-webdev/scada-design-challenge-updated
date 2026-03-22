// src/components/PumpControlModal.jsx
import React, { useState } from "react";
import "../styles/pump-modal.css";

/**
 * Pump Control Modal
 * Props:
 *   isOpen        – boolean
 *   onClose       – function
 *   pumpId        – string, e.g. "PRI1"
 *   pumpLabel     – string, e.g. "PRI-01"
 *   speed         – number, current speed percentage
 *   onSpeedChange – function(newSpeed) called when speed changes
 */
export default function PumpControlModal({ isOpen, onClose, pumpId, pumpLabel, speed, onSpeedChange }) {
  const [mode, setMode] = useState("manual"); // "off" | "manual" | "auto"

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const clampSpeed = (v) => Math.max(0, Math.min(100, v));

  const changeSpeed = (delta) => {
    const newSpeed = clampSpeed(speed + delta);
    onSpeedChange(newSpeed);
  };

  return (
    <div className="pump-modal-overlay" onClick={handleOverlayClick}>
      <div className="pump-modal-card">
        {/* Header */}
        <div className="pump-modal-header">
          <span className="pump-modal-title">#{pumpId}</span>
          <button className="pump-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Body */}
        <div className="pump-modal-body">
          {/* Percentage readout */}
          <div className="pump-modal-percent">
            <span className="pump-modal-percent-dim">0</span>
            <span className="pump-modal-percent-bold">{speed}</span>
            <span className="pump-modal-percent-unit">%</span>
          </div>
          <div className="pump-modal-label">{pumpLabel}</div>

          {/* Pump crosshair icon */}
          <div className="pump-modal-icon-area">
            <svg className="pump-modal-icon-svg" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
              {/* Outer circle */}
              <circle cx="40" cy="40" r="28" fill="none" stroke="#1a1a2e" strokeWidth="2.5" />
              {/* Inner circle */}
              <circle cx="40" cy="40" r="8" fill="none" stroke="#1a1a2e" strokeWidth="2.5" />
              {/* Center dot */}
              <circle cx="40" cy="40" r="3" fill="#1a1a2e" />
              {/* Crosshair lines */}
              <line x1="40" y1="4" x2="40" y2="12" stroke="#1a1a2e" strokeWidth="2.5" />
              <line x1="40" y1="68" x2="40" y2="76" stroke="#1a1a2e" strokeWidth="2.5" />
              <line x1="4" y1="40" x2="12" y2="40" stroke="#1a1a2e" strokeWidth="2.5" />
              <line x1="68" y1="40" x2="76" y2="40" stroke="#1a1a2e" strokeWidth="2.5" />
            </svg>
          </div>

          {/* Mode: Off / Manual / Auto */}
          <div className="pump-modal-mode-row">
            <button className={`pump-modal-mode-btn ${mode === "off" ? "active" : ""}`}
                    onClick={() => setMode("off")}>Off</button>
            <button className={`pump-modal-mode-btn ${mode === "manual" ? "active" : ""}`}
                    onClick={() => setMode("manual")}>Manual</button>
            <button className={`pump-modal-mode-btn ${mode === "auto" ? "active" : ""}`}
                    onClick={() => setMode("auto")}>Auto</button>
          </div>
          <div className="pump-modal-state-label">Pump state</div>

          {/* Speed control */}
          <div className="pump-modal-speed-row">
            <button className="pump-modal-speed-btn" onClick={() => changeSpeed(-10)}>«</button>
            <button className="pump-modal-speed-btn" onClick={() => changeSpeed(-1)}>‹</button>
            <div className="pump-modal-speed-display">{speed}%</div>
            <button className="pump-modal-speed-btn" onClick={() => changeSpeed(1)}>›</button>
            <button className="pump-modal-speed-btn" onClick={() => changeSpeed(10)}>»</button>
          </div>
          <div className="pump-modal-speed-labels">
            <span className="pump-modal-speed-label">-10</span>
            <span className="pump-modal-speed-label">-1</span>
            <span className="pump-modal-speed-label-center">Speed</span>
            <span className="pump-modal-speed-label">+1</span>
            <span className="pump-modal-speed-label">+10</span>
          </div>

          {/* Readouts */}
          <div className="pump-modal-readouts-title">READOUTS</div>
          <div className="pump-modal-readouts-row">
            <div className="pump-modal-readout">
              <span className="pump-modal-readout-dim">0</span>
              <span className="pump-modal-readout-bold">16</span>
              <div className="pump-modal-readout-info">
                <span className="pump-modal-readout-name">Speed</span>
                <span className="pump-modal-readout-unit">rpm</span>
              </div>
            </div>
            <div className="pump-modal-readout">
              <span className="pump-modal-readout-dim">0</span>
              <span className="pump-modal-readout-bold">16</span>
              <div className="pump-modal-readout-info">
                <span className="pump-modal-readout-name">Current</span>
                <span className="pump-modal-readout-unit">A</span>
              </div>
            </div>
            <div className="pump-modal-readout">
              <span className="pump-modal-readout-dim">0</span>
              <span className="pump-modal-readout-bold">16</span>
              <div className="pump-modal-readout-info">
                <span className="pump-modal-readout-name">Power</span>
                <span className="pump-modal-readout-unit">kW</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
