import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default function MoveColumn() {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete" },
    { field: "age" },
    { field: "country" },
    { field: "year" },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      width: 150,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const onMedalsFirst = useCallback(() => {
    gridRef.current.columnApi.moveColumns(
      ["gold", "silver", "bronze", "total"],
      0
    );
  }, []);

  const onMedalsLast = useCallback(() => {
    gridRef.current.columnApi.moveColumns(
      ["gold", "silver", "bronze", "total"],
      6
    );
  }, []);

  const onCountryFirst = useCallback(() => {
    gridRef.current.columnApi.moveColumn("country", 0);
  }, []);

  const onSwapFirstTwo = useCallback(() => {
    gridRef.current.columnApi.moveColumnByIndex(2, 1);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: "1rem" }}>
          <button onClick={onMedalsFirst}>Medals First</button>
          <button onClick={onMedalsLast}>Medals Last</button>
          <button onClick={onCountryFirst}>Country First</button>
          <button onClick={onSwapFirstTwo}>Swap First Two</button>
        </div>

        <div
          style={{ height: "500px", width: "800px" }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            suppressDragLeaveHidesColumns={true}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
}
