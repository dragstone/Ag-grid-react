import React, { useEffect, useState, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default function Pagination() {
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef(null);

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
      .then((rowData) => {
        setRowData(rowData);
        // gridRef.current.api.paginationGoToPage(10);
      });
  }, []);

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      flex: 1,
    }),
    []
  );

  const onSelectedValue = (e) => {
    console.log(e.target.value);
    gridRef.current.api.paginationSetPageSize(e.target.value);
  };

  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: 400, width: 700 }}>
        {/* <select onChange={onSelectedValue}>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select> */}
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          //   paginationAutoPageSize={true}
        />
      </div>
    </div>
  );
}
