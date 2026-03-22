// src/App.jsx
import React, { useState } from "react";
import ExpandedColdFull from "./components/ExpandedColdFull";
import AlertPage from "./components/AlertPage";
import TablePage from "./components/TablePage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      {currentPage === "table" ? (
        <TablePage setCurrentPage={setCurrentPage} />
      ) : currentPage === "alerts" ? (
        <AlertPage setCurrentPage={setCurrentPage} />
      ) : (
        <ExpandedColdFull setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
}


