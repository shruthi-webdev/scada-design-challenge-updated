import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "../styles/table-page.css";

export default function TablePage({ setCurrentPage }) {
  const [tableData, setTableData] = useState([
    { id: '# BTA2', system: 'Water', device: 'Heat exchange tank', icon: 'obi-heatexhanger', status: 'green', checked: false },
    { id: '# BTA2', system: 'Water', device: 'Three way valve', icon: 'obi-valve-analog-three-way', status: 'yellow', checked: false },
    { id: '# BTA2', system: 'Water', device: 'Two way valve', icon: 'obi-valve-analog-two-way', status: 'green', checked: false },
    { id: '# BTA2', system: 'Water', device: 'Heat exchange tank', icon: 'obi-heatexhanger', status: 'green', checked: false },
    { id: '# BTA2', system: 'Water', device: 'Heat exchange tank', icon: 'obi-heatexhanger', status: 'green', checked: false },
    { id: '# BTA2', system: 'Water', device: 'Hydraulic separator', icon: 'obi-hydraulic-separator', status: 'green', checked: false },
    { id: '# BTA2', system: 'Water', device: 'Heat exchange tank', icon: 'obi-heatexhanger', status: 'green', checked: false },
    { id: '# BTA2', system: 'Water', device: 'Pump', icon: 'obi-pump-on-vertical', status: 'green', checked: true },
    { id: '# BTA2', system: 'Water', device: 'Heat pump', icon: 'obi-heatpump', status: 'green', checked: false },
    { id: '# BTA2', system: 'Water', device: 'Primary pump system', icon: 'obi-pump-on-vertical', status: 'green', checked: true },
    { id: '# BTA2', system: 'Water', device: 'Secondary pump system', icon: 'obi-pump-on-vertical', status: 'yellow', checked: true },
    { id: '# BTA2', system: 'AC', device: 'Filter', icon: 'obi-filter', status: 'green', checked: false },
    { id: '# BTA2', system: 'AC', device: 'Fan', icon: 'obi-propulsion-static', status: 'yellow', checked: false },
    { id: '# BTA2', system: 'AC', device: 'Switch', icon: 'obi-switch', status: 'grey', checked: false },
  ]);

  const toggleCheck = (index) => {
    const newData = [...tableData];
    newData[index].checked = !newData[index].checked;
    setTableData(newData);
  };

  const renderStatus = (color) => {
    const map = {
      'green': '#28a745',
      'yellow': '#ffc107',
      'grey': '#9e9e9e'
    };
    return <span className="status-dot" style={{ backgroundColor: map[color] }}></span>;
  };

  const renderSystem = (system) => {
    if (system === 'Water') {
      return (
        <span className="system-pill water">
          <obi-water-google style={{ fontSize: '12px', marginRight: '4px' }}></obi-water-google> Water
        </span>
      );
    }
    return (
      <span className="system-pill ac">
        <obi-ac-google style={{ fontSize: '12px', marginRight: '4px' }}></obi-ac-google> AC
      </span>
    );
  };

  return (
    <div className="table-page-wrapper">
      <Sidebar setCurrentPage={setCurrentPage} />
      
      {/* Structure Sidebar */}
      <div className="structure-sidebar">
        <div className="structure-header">Structure</div>
        <div className="structure-list">
          <div className="structure-item">
            <span className="step-num">1</span> Filter and search
          </div>
          <div className="structure-item active">
            <span className="step-num">2</span> Table
          </div>
          <div className="structure-item">
            <span className="step-num">3</span> Content area
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="table-main-content">
        <div className="table-top-bar">
          <div className="search-group">
            <div className="search-input-wrapper">
              <input type="text" placeholder="Placeholder" />
            </div>
            <button className="icon-btn-outline"><obi-filter></obi-filter></button>
          </div>
          
          <div className="filters-group">
            <button className="pill-btn active">All</button>
            <button className="pill-btn"><obi-water-google></obi-water-google> Water</button>
            <button className="pill-btn"><obi-ac-google></obi-ac-google> AC</button>
          </div>

          <div className="toggle-group rooms-devices">
            <button className="toggle-btn active">Rooms</button>
            <button className="toggle-btn">Devices</button>
          </div>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th className="th-checkbox"><input type="checkbox" /></th>
                <th className="th-id">
                  ID <span className="sort-arrow">▼</span>
                </th>
                <th className="th-system">
                  SYSTEM <span className="sort-arrow">▼</span>
                </th>
                <th className="th-device">DEVICES & SYSTEM REGIONS</th>
                <th className="th-status">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i} className={row.checked ? "checked-row" : ""}>
                  <td className="td-checkbox">
                    <input type="checkbox" checked={row.checked} onChange={() => toggleCheck(i)} />
                  </td>
                  <td className="td-id">{row.id}</td>
                  <td className="td-system">{renderSystem(row.system)}</td>
                  <td className="td-device">
                    {/* fallback generic icon if proper web component isn't available */}
                    <span className="device-icon">
                      {row.icon === 'obi-heatexhanger' ? <obi-heatexhanger></obi-heatexhanger> : 
                       row.icon === 'obi-valve-analog-three-way' ? <obi-valve-analog-three-way-icon></obi-valve-analog-three-way-icon> :
                       row.icon === 'obi-valve-analog-two-way' ? <obi-valve-analog-two-way-icon></obi-valve-analog-two-way-icon> :
                       row.icon === 'obi-hydraulic-separator' ? <obi-hydraulic-separator></obi-hydraulic-separator> :
                       row.icon === 'obi-pump-on-vertical' ? <obi-settings></obi-settings> :
                       row.icon === 'obi-heatpump' ? <obi-settings></obi-settings> :
                       row.icon === 'obi-switch' ? <obi-settings-iec></obi-settings-iec> :
                       <obi-diagnostic-google></obi-diagnostic-google>}
                    </span>
                    {row.device}
                  </td>
                  <td className="td-status">{renderStatus(row.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Control Panel */}
      <div className="table-right-panel">
        <div className="global-controls">
          <div className="control-row">
            <span className="control-label">LEVEL</span>
            <span className="control-value">10%</span>
            <div className="slider-track blue"><div className="slider-thumb" style={{left: '10%'}}></div></div>
          </div>
          <div className="control-row">
            <span className="control-label">SPEED</span>
            <span className="control-value">10%</span>
            <div className="slider-track blue"><div className="slider-thumb" style={{left: '10%'}}></div></div>
          </div>
          
          <div className="control-group">
            <div className="control-label-sm">MODE</div>
            <div className="segmented-control">
              <button className="seg-btn outline">Manual</button>
              <button className="seg-btn solid">Auto</button>
            </div>
            <div className="segmented-control" style={{marginTop: '8px'}}>
              <button className="seg-btn outline">Standby</button>
              <button className="seg-btn solid">Run</button>
            </div>
          </div>
        </div>

        <div className="right-card">
          <div className="card-header">
            <span>STATUS</span>
            <span className="close-x">×</span>
          </div>
          
          <div className="segmented-control three-way" style={{marginBottom: '16px'}}>
            <button className="seg-btn outline">Off</button>
            <button className="seg-btn solid">Manual</button>
            <button className="seg-btn outline">Auto</button>
          </div>

          <div className="control-label-sm" style={{marginBottom: '8px'}}>Pump state</div>
          <div className="control-row">
            <span className="control-label">SPEED</span>
            <span className="control-value box">10%</span>
            <div className="slider-track blue"><div className="slider-thumb" style={{left: '10%'}}></div></div>
          </div>
          
          <div className="segmented-control split" style={{marginTop: '16px'}}>
            <button className="seg-btn outline">Stop</button>
            <button className="seg-btn solid">Run</button>
          </div>
        </div>

        <div className="right-card transparent">
          <div className="card-header-sm">READOUTS</div>
          <div className="readouts-grid">
            <div className="readout-box">
              <div className="r-label">SPEED</div>
              <div className="r-val">16<span className="sm">%</span></div>
            </div>
            <div className="readout-box">
              <div className="r-label">CURRENT</div>
              <div className="r-val">16<span className="sm">A</span></div>
            </div>
            <div className="readout-box">
              <div className="r-label">POWER</div>
              <div className="r-val">16<span className="sm">kW</span></div>
            </div>
          </div>
        </div>

        <div className="right-card">
          <div className="card-header">
            <span>SECONDARY PUMP SYSTEM</span>
            <span className="close-x">×</span>
          </div>
          
          <div className="control-row">
            <span className="control-label">LEVEL</span>
            <span className="control-value box">10%</span>
            <div className="slider-track green"><div className="slider-thumb" style={{left: '10%'}}></div></div>
          </div>
          <div className="control-row" style={{marginBottom: '16px'}}>
            <span className="control-label">SPEED</span>
            <span className="control-value box">10%</span>
            <div className="slider-track green"><div className="slider-thumb" style={{left: '10%'}}></div></div>
          </div>

          <div className="segmented-control split">
            <button className="seg-btn outline">Stop</button>
            <button className="seg-btn solid">Run</button>
          </div>
        </div>
      </div>
    </div>
  );
}
