import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const createData = (count, prefix) => {
  var result = [];
  for (var i = 0; i < count; i++) {
    result.push({
      athlete: prefix + " Athlete " + i,
      age: prefix + " Age " + i,
      country: prefix + " Country " + i,
      year: prefix + " Year " + i,
      date: prefix + " Date " + i,
      sport: prefix + " Sport " + i,
    });
  }
  return result;
};

export default function PinRows() {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "500px", width: "700px" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "athlete",
    },
    {
      field: "age",
    },
    { field: "country" },
    { field: "year" },
    { field: "date" },
    { field: "sport" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      width: 200,
      sortable: true,
      filter: true,
      resizable: true,
    };
  }, []);
  const getRowStyle = useCallback(function (params) {
    if (params.node.rowPinned) {
      return { "font-weight": "bold" };
    }
  }, []);
  const pinnedTopRowData = useMemo(() => {
    return createData(1, "Top");
  }, []);
  const pinnedBottomRowData = useMemo(() => {
    return createData(1, "Bottom");
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const onPinnedRowTopCount = useCallback(() => {
    var headerRowsToFloat = document.getElementById("top-row-count").value;
    var count = Number(headerRowsToFloat);
    var rows = createData(count, "Top");
    gridRef.current.api.setPinnedTopRowData(rows);
  }, []);

  const onPinnedRowBottomCount = useCallback(() => {
    var footerRowsToFloat = document.getElementById("bottom-row-count").value;
    var count = Number(footerRowsToFloat);
    var rows = createData(count, "Bottom");
    gridRef.current.api.setPinnedBottomRowData(rows);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
          <span>Rows to Pin on Top:</span>
          <select
            onChange={onPinnedRowTopCount}
            id="top-row-count"
            style={{ marginLeft: "10px", marginRight: "20px" }}
          >
            <option value="0">0</option>
            <option value="1" selected={true}>
              1
            </option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <span>Rows to Pin on Bottom:</span>
          <select
            onChange={onPinnedRowBottomCount}
            id="bottom-row-count"
            style={{ marginLeft: "10px" }}
          >
            <option value="0">0</option>
            <option value="1" selected={true}>
              1
            </option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            getRowStyle={getRowStyle}
            pinnedTopRowData={pinnedTopRowData}
            pinnedBottomRowData={pinnedBottomRowData}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
}
