import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
export default function FileA() {
  const [rowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ]);

  //   to apply sort on any column use sortable attribute , to apply filter use filter attribute,floatingFilter
  const [columnDefs] = useState([
    {
      headerName: "Make",
      field: "make",
      sortable: true,
      filter: true,
      floatingFilter: true,
      // filter: "agTextColumnFilter",
    },
    { headerName: "Models", field: "model" },
    { headerName: "Price", field: "price" },
  ]);

  const defaultColDef = {
    flex: 1,
  };

  return (
    <div className="ag-theme-alpine">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        // domLayout={"autoHeight"}
        // defaultColDef={defaultColDef}
      ></AgGridReact>
    </div>
  );
}
