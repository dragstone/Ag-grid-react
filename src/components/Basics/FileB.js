import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
export default function FileB() {
  const gridRef = useRef(null);
  const [rowData, setRowData] = useState([]);

  //   to apply sort on any column use sortable attribute , to apply filter use filter attribute
  const [columnDefs] = useState([
    { field: "rowHeight", hide: false, sortable: false },
    { headerName: "Make", field: "make" },
    { headerName: "Models", field: "model" },
    { headerName: "Price", field: "price" },
  ]);

  //   useEffect(()=>{
  //     fetch("https://www.ag-grid.com/example-assets/row-data.json")
  //     .then((result) => result.json())
  //     .then((rowData) => setRowData(rowData));
  //   },[])

  //   Grid Events
  const onGridReady = () => {
    console.log("The grid is now ready");
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => {
        rowData.forEach((element) => {
          element.rowHeight = Math.random() * 100;
        });
        setRowData(rowData);
      });
  };

  const onSelectRows = () => {
    const data = gridRef.current.api.getSelectedRows();
    console.log(data);
  };

  // grid event
  const onRowSelected = () => {
    const data = gridRef.current.api.getSelectedNodes();
    data.map((item) => {
      console.log(item.data, item.isSelected());
    });
  };

  // grid callback
  const getRowHeight = (params) => {
    console.log(params);
    return params.data.rowHeight;
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
      <button onClick={onSelectRows}>Selected Row</button>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        rowSelection="multiple"
        onRowSelected={onRowSelected}
        // rowHeight={50}
        getRowHeight={getRowHeight}
      ></AgGridReact>
    </div>
  );
}
