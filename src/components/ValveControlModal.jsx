// src/components/ValveControlModal.jsx
import React, { useState } from "react";
import "../styles/valve-modal.css";

/**
 * Valve Control Modal
 * Props:
 *   isOpen   – boolean, controls visibility
 *   onClose  – function, called when closing the modal
 *   valveId  – string, e.g. "AFT1_V1"
 *   valveLabel – string, e.g. "AFT1 Valve 1"
 */
export default function ValveControlModal({ isOpen, onClose, valveId, valveLabel }) {
  const [valveState, setValveState] = useState("closed");

  if (!isOpen) return null;

  const isValveOpen = valveState === "open";
  const percentBold = isValveOpen ? "100" : "0";
  const percentDim = "0";

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="valve-modal-overlay" onClick={handleOverlayClick}>
      <div className="valve-modal-card">
        {/* Header */}
        <div className="valve-modal-header">
          <span className="valve-modal-title">#{valveId}</span>
          <button className="valve-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Body */}
        <div className="valve-modal-body">
          {/* Percentage readout */}
          <div className="valve-modal-percent">
            <span className="valve-modal-percent-dim">{percentDim}</span>
            <span className="valve-modal-percent-bold">{percentBold}</span>
            <span className="valve-modal-percent-unit">%</span>
          </div>
          <div className="valve-modal-label">{valveLabel}</div>

          {/* Valve icon */}
          <div className="valve-modal-icon-area">
            {/* Connector symbol */}
            <div className="valve-modal-connector">
              <svg viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="0" width="8" height="4" rx="1"
                  fill={isValveOpen ? "#1a1a2e" : "#c0c0c0"} />
                <rect x="10" y="4" width="4" height="6" rx="0.5"
                  fill={isValveOpen ? "#1a1a2e" : "#c0c0c0"} />
              </svg>
            </div>
            {/* Butterfly valve (bowtie) */}
            <svg className={`valve-modal-valve-svg ${isValveOpen ? "open-state" : "closed-state"}`}
                 viewBox="0 0 56 44" xmlns="http://www.w3.org/2000/svg">
              {/* Left triangle */}
              <polygon points="4,2 28,22 4,42"
                fill={isValveOpen ? "#1a1a2e" : "#c0c0c0"}
                stroke={isValveOpen ? "#1a1a2e" : "#c0c0c0"}
                strokeWidth="2" strokeLinejoin="round" />
              {/* Right triangle */}
              <polygon points="52,2 28,22 52,42"
                fill={isValveOpen ? "#1a1a2e" : "#c0c0c0"}
                stroke={isValveOpen ? "#1a1a2e" : "#c0c0c0"}
                strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Footer: Open / Closed buttons */}
        <div className="valve-modal-footer">
          <button
            className={`valve-modal-btn valve-modal-btn-closed ${!isValveOpen ? "active" : ""}`}
            onClick={() => setValveState("closed")}
          >
            Closed
          </button>
          <button
            className={`valve-modal-btn valve-modal-btn-open ${isValveOpen ? "active" : ""}`}
            onClick={() => setValveState("open")}
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
}
