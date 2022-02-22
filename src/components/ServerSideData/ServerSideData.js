import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

export default function ServerSideData() {
  const [gridApi, setGridApi] = useState(null);
  const defaultColDef = {
    filter: true,
    floatingFilter: true,
    sortable: true,
  };

  //   to apply sort on any column use sortable attribute , to apply filter use filter attribute,floatingFilter
  const columnDefs = [
    { headerName: "Athlete", field: "athlete", filter: "agTextColumnFilter" },
    { headerName: "Age", field: "age", filter: "agTextColumnFilter" },
    { headerName: "Country", field: "country", filter: "agTextColumnFilter" },
    { headerName: "Year", field: "year", filter: "agTextColumnFilter" },
    { headerName: "Date", field: "date", filter: "agTextColumnFilter" },
    { headerName: "Sport", field: "sport", filter: "agTextColumnFilter" },
    { headerName: "Gold", field: "gold", filter: "agTextColumnFilter" },
    { headerName: "Silver", field: "silver", filter: "agTextColumnFilter" },
    { headerName: "Bronze", field: "bronze", filter: "agTextColumnFilter" },
    { headerName: "Total", field: "total", filter: "agTextColumnFilter" },
  ];

  const datasource = {
    getRows(params) {
      console.log(JSON.stringify(params.request, null, 1));
      const { startRow, endRow, filterModel, sortModel } = params.request;
      let url = "http://localhost:4000/olympic?";
      //   sorting
      if (sortModel.length) {
        const { colId, sort } = sortModel[0];
        url += `_sort=${colId}&_order=${sort}&`;
      }
      //filtering
      const filterKeys = Object.keys(filterModel);
      filterKeys.forEach((key) => {
        url += `${key}=${filterModel[key].filter}&`;
      });
      //pagination
      url += `_start=${startRow}&_end=${endRow}`;
      console.log(url);
      fetch(url)
        .then((httpResponse) => httpResponse.json())
        .then((response) => {
          params.successCallback(response, 499);
        })
        .catch((error) => {
          console.error(error);
          params.failCallback();
        });
    },
  };

  const onGridReady = (params) => {
    setGridApi(params);
    // register datasource with the grid
    params.api.setServerSideDatasource(datasource);
  };

  return (
    <div className="ag-theme-alpine">
      <AgGridReact
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        rowModelType="serverSide"
        pagination={true}
        paginationPageSize={10}
        domLayout={"autoHeight"}
        serverSideStoreType={"partial"}
        defaultColDef={defaultColDef}
      ></AgGridReact>
    </div>
  );
}
