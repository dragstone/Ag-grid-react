import React, { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default function Tooltip() {
  const [rowData, setRowData] = useState([]);

  const [columnDefs] = useState([
    {
      field: "make",
      sortable: true,
      filter: true,
      editable: true,
    },
    { field: "model", sortable: true, filter: true, tooltipField: "make" },
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

  // const onSelectionChanged = (event) => {
  //   console.log(event.api.getSelectedRows());
  // };

  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: 500, width: 700 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableBrowserTooltips={true}
        />
      </div>
    </div>
  );
}
