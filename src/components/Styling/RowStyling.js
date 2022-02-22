import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const randomInt = () => {
  return Math.floor(Math.random() * 10);
};

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

export default function RowStyling() {
  const gridRef = useRef();
  const containerStyle = useMemo(
    () => ({ width: "700px", height: "500px" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Employee", field: "employee" },
    { headerName: "Number Sick Days", field: "sickDays", editable: true },
  ]);
  const rowClassRules = useMemo(() => {
    return {
      // row style function
      "sick-days-warning": function (params) {
        var numSickDays = params.data.sickDays;
        return numSickDays > 5 && numSickDays <= 7;
      },
      // row style expression
      "sick-days-breach": "data.employee.length>=15",
    };
  }, []);

  const rowClass = "sick-days-breach";

  const getRowClass = (params) => {
    if (params.node.rowIndex % 2 === 0) {
      return "my-shaded-effect";
    }
  };

  const rowStyle = { background: "black" };

  // set background colour on even rows again, this looks bad, should be using CSS classes
  const getRowStyle = (params) => {
    if (params.node.rowIndex % 2 === 0) {
      return { background: "red" };
    }
  };

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            // rowClassRules={rowClassRules}
            // rowClass={rowClass}
            // getRowClass={getRowClass}
            // rowStyle={rowStyle}
            // getRowStyle={getRowStyle}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
}
