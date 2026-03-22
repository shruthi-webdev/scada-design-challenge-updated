import React from "react";
import Sidebar from "./Sidebar";
import "../styles/alert-page.css";

export default function AlertPage({ setCurrentPage }) {
  const alertsData = [
    { id: 1, type: 'alarm-unack', source: 'GPS', cause: 'Loss of position', tag: '#000000', time: '09:12:45 Today', pinned: false, ack: false, selected: true },
    { id: 2, type: 'alarm-unack', source: 'GPS', cause: 'Loss of position', tag: '#000000', time: '09:12:45 Today', pinned: false, ack: false },
    { id: 3, type: 'alarm-unack', source: 'GPS', cause: 'Loss of position', tag: '#000000', time: '09:12:45 Today', pinned: false, ack: false },
    { id: 4, type: 'alarm-unack', source: 'GPS', cause: 'Loss of position', tag: '#000000', time: '09:12:45 Today', pinned: false, ack: true },
    { id: 5, type: 'warning-unack', source: 'GPS', cause: 'Loss of position', tag: '#000000', time: '09:12:45 Today', pinned: true, ack: false },
    { id: 6, type: 'warning-unack', source: 'GPS', cause: 'Loss of position', tag: '#000000', time: '09:12:45 Today', pinned: true, ack: false },
    { id: 7, type: 'warning-unack', source: 'GPS', cause: 'Loss of position', tag: '#000000', time: '09:12:45 Today', pinned: false, ack: false },
    { id: 8, type: 'alarm-ack', source: 'GPS', cause: 'Loss of position', tag: '#000000', time: '09:12:45 Today', pinned: false, ack: true },
    { id: 9, type: 'alarm-ack', source: 'GPS', cause: 'Loss of position', tag: '#000000', time: '09:12:45 Today', pinned: false, ack: true },
    { id: 10, type: 'alarm-ack', source: 'GPS', cause: 'Loss of position', tag: '#000000', time: '09:12:45 Today', pinned: false, ack: true },
    { id: 11, type: 'alarm-ack', source: 'GPS', cause: 'Loss of position', tag: '#000000', time: '09:12:45 Today', pinned: false, ack: true },
    { id: 12, type: 'alarm-ack', source: 'GPS', cause: 'Loss of position', tag: '#000000', time: '09:12:45 Today', pinned: false, ack: true },
    { id: 13, type: 'alarm-ack', source: 'GPS', cause: 'Loss of position', tag: '#000000', time: '09:12:45 Today', pinned: false, ack: true },
    { id: 14, type: 'alarm-ack', source: 'GPS', cause: 'Loss of position', tag: '#000000', time: '09:12:45 Today', pinned: false, ack: true },
    { id: 15, type: 'alarm-ack', source: 'GPS', cause: 'Loss of position', tag: '#000000', time: '09:12:45 Today', pinned: false, ack: true },
  ];

  const renderIcon = (type) => {
    switch (type) {
      case 'alarm-unack':
        return <obi-alarm-unacknowledged-iec style={{ color: 'var(--obi-color-alarm-unacknowledged, #cf2a27)' }}></obi-alarm-unacknowledged-iec>;
      case 'warning-unack':
        return <obi-warning-unacknowledged-iec style={{ color: 'var(--obi-color-warning-unacknowledged, #ff9800)' }}></obi-warning-unacknowledged-iec>;
      case 'alarm-ack':
        return <obi-alarm-acknowledged-iec style={{ color: 'var(--obi-color-alarm-acknowledged, #cf2a27)' }}></obi-alarm-acknowledged-iec>;
      default:
        return null;
    }
  };

  return (
    <div className="alert-page-wrapper">
      <Sidebar setCurrentPage={setCurrentPage} />
      
      <div className="alert-content-area">
        <div className="alert-table-section">
          <div className="alert-table-header">
            <div className="col-source">SOURCE</div>
            <div className="col-cause">CAUSE</div>
            <div className="col-tag">TAG ID</div>
            <div className="col-time">TIME (UTC)</div>
            <div className="col-pin">PIN</div>
            <div className="col-ack">ACK</div>
          </div>
          <div className="alert-table-body">
            {alertsData.map((alert) => (
              <div className={`alert-row ${alert.selected ? "selected" : ""}`} key={alert.id}>
                <div className="col-source">
                  <span className="alert-icon">{renderIcon(alert.type)}</span>
                  {alert.source}
                </div>
                <div className="col-cause">{alert.cause}</div>
                <div className="col-tag">{alert.tag}</div>
                <div className="col-time">{alert.time}</div>
                <div className="col-pin">
                  {alert.pinned && <obi-pin-unpin style={{ fontSize: '16px', color: '#666' }}></obi-pin-unpin>}
                </div>
                <div className="col-ack">
                  {alert.ack && <button className="ack-btn-small">ACK</button>}
                </div>
              </div>
            ))}
          </div>

          <div className="alert-bottom-bar">
            <div className="left-actions">
              <button className="icon-btn-square"><obi-plus></obi-plus></button>
              <button className="icon-btn-square"><obi-plus></obi-plus></button>
              <button className="text-btn-square"><obi-filter></obi-filter> Filters</button>
            </div>
            <div className="right-actions">
              <button className="text-btn-square"><obi-volume-off></obi-volume-off> Mute</button>
              <button className="btn-dark">Ack all visible</button>
              <button className="icon-btn-square"><obi-file></obi-file></button>
            </div>
          </div>
        </div>

        <div className="alert-right-sidebar">
          <div className="sidebar-section">
            <div className="section-header">
              <obi-settings></obi-settings> SELECTED
            </div>
            <div className="selected-card">
              <div className="card-top">
                <div className="card-title">
                  <obi-alarm-unacknowledged-iec style={{ color: '#cf2a27', marginRight: '8px' }}></obi-alarm-unacknowledged-iec>
                  Radar
                </div>
                <obi-pin-unpin className="pin-icon"></obi-pin-unpin>
              </div>
              <div className="card-desc">Crossing Safety Contour</div>
              
              <div className="card-details-label">DETAILS</div>
              <div className="card-details-value">Check ahead on the DISP</div>

              <div className="card-grid">
                <div>
                  <div className="grid-label">PRIORITY</div>
                  <div className="grid-value">Alarm</div>
                </div>
                <div>
                  <div className="grid-label">ALERT ID</div>
                  <div className="grid-value">3036</div>
                </div>
                <div>
                  <div className="grid-label">CATEGORY</div>
                  <div className="grid-value">B</div>
                </div>
              </div>

              <div className="card-time-label">TIME UPDATED</div>
              <div className="card-time-value">Today 09:12:45</div>

              <div className="card-actions">
                <button className="btn-dark">ACK</button>
                <button className="btn-outline">Shelf</button>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="section-header">
              <obi-pin-unpin></obi-pin-unpin> PINNED
            </div>
            <div className="pinned-card">
              <div className="pinned-title">
                <obi-warning-unacknowledged-iec style={{ color: '#ff9800', marginRight: '8px' }}></obi-warning-unacknowledged-iec>
                Title
              </div>
              <div className="pinned-actions">
                <span className="expand-icon">▴</span>
                <span className="close-icon">×</span>
              </div>
            </div>
            <div className="pinned-card">
              <div className="pinned-title">
                <obi-warning-unacknowledged-iec style={{ color: '#ff9800', marginRight: '8px' }}></obi-warning-unacknowledged-iec>
                Title
              </div>
              <div className="pinned-actions">
                <span className="expand-icon">▴</span>
                <span className="close-icon">×</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
