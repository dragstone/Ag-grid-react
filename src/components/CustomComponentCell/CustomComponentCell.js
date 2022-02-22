import React, { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default function CustomComponentCell() {
  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState([
    {
      field: "make",
      sortable: true,
      filter: true,
      editable: true,
    },
    { headerName: "model", field: "model", sortable: true, filter: true },
    { headerName: "price", field: "price", sortable: true, filter: true },
    {
      headerName: "Actions",
      cellRendererFramework: (params) => {
        return (
          <div>
            <button onClick={() => actionButton(params)}>click</button>
          </div>
        );
      },
    },
  ]);

  const actionButton = (params) => {
    console.log(params.data);
  };

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

  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: 500, width: 700 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
}
