import React, { useEffect, useState, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default function ExportData() {
  const gridRef = useRef(null);
  const [rowData, setRowData] = useState([]);

  const [columnDefs] = useState([
    {
      field: "make",
      sortable: true,
      filter: true,
      editable: true,
    },
    { field: "model", sortable: true, filter: true },
    { field: "price", sortable: true, filter: true },
  ]);

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      flex: 1,
    }),
    []
  );

  const onExportClick = () => {
    gridRef.current.api.exportDataAsCsv();
  };

  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: 500, width: 700 }}>
        <div>
          <button onClick={onExportClick}>Export</button>
        </div>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
}
