import React, { useEffect, useState, useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default function EditColumn() {
  const [rowData, setRowData] = useState([]);

  const [columnDefs] = useState([
    {
      field: "make",
      sortable: true,
      editable: true,
    },
    { field: "model", sortable: true, filter: true },
    { field: "price", sortable: true, filter: true },
  ]);
  const gridRef = useRef(null);

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  const onCellValueChanged = (event) => {
    console.log(
      "onCellValueChanged: " + event.colDef.field + " = " + event.newValue
    );
  };

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      editable: true,
      sortable: true,
      flex: 1,
    }),
    []
  );

  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: 500, width: 700 }}>
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          rowData={rowData}
          onCellValueChanged={onCellValueChanged}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
}
