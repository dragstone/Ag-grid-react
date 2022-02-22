import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function getData() {
  return [
    { employee: "Josh Finch", sickDays: 4 },
    { employee: "Flavia Mccloskey", sickDays: 1 },
    { employee: "Marine Creason", sickDays: 8 },
    { employee: "Carey Livingstone", sickDays: 2 },
    { employee: "Brande Giorgi", sickDays: 5 },
    { employee: "Beatrice Kugler", sickDays: 3 },
    { employee: "Elvia Macko", sickDays: 7 },
    { employee: "Santiago Little", sickDays: 1 },
    { employee: "Mary Clifton", sickDays: 2 },
    { employee: "Norris Iniguez", sickDays: 1 },
    { employee: "Shellie Umland", sickDays: 5 },
    { employee: "Kristi Nawrocki", sickDays: 2 },
    { employee: "Elliot Malo", sickDays: 3 },
    { employee: "Paul Switzer", sickDays: 11 },
    { employee: "Lilly Boaz", sickDays: 6 },
    { employee: "Frank Kimura", sickDays: 1 },
    { employee: "Alena Wages", sickDays: 5 },
  ];
}

export default function ColumnStyling() {
  const gridRef = useRef();
  const containerStyle = useMemo(
    () => ({ width: "700px", height: "500px" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Employee",
      field: "employee",

      //   cellStyle: { color: "white", "background-color": "green" },
      //   cellClass: "sick-days-warning",
    },
    {
      headerName: "Number Sick Days",
      field: "sickDays",
      editable: true,
      cellStyle: (params) => {
        if (params.value > 4) {
          //mark police cells as red
          return { color: "red", backgroundColor: "pink" };
        }
        return null;
      },
    },
  ]);
  const cellClassRules = {
    // apply green to 2008
    "sick-days-warning": (params) => params.value === 5,
  };

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
}
