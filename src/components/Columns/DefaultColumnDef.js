import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
export default function DefaultColumnDef() {
  const [rowData, setRowData] = useState([]);

  //   to apply sort on any column use sortable attribute , to apply filter use filter attribute
  const [columnDefs] = useState([
    { headerName: "Make", field: "make" },
    { headerName: "Models", field: "model" },
    { headerName: "Price", field: "price" },
  ]);

  //   Grid Events
  const onGridReady = () => {
    console.log("The grid is now ready");
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  };

  const defaultColDef = {
    // set every column sortable
    sortable: true,
    // set every column width
    width: 100,
    // make every column editable
    editable: true,
    // make every column use 'text' filter by default
    filter: "agTextColumnFilter",
  };
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        defaultColDef={defaultColDef}
      ></AgGridReact>
    </div>
  );
}
