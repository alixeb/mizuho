import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import './Grid.css'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const columnDefs = [
  {
    field: 'time',
    headerName: 'Time'
  },
  {
    field: 'open',
    headerName: 'Open',
    width: 100
  },
  {
    field: 'close',
    headerName: 'Close',
    width: 100
  },
  {
    field: 'high',
    headerName: 'High',
    width: 100
  },
  {
    field: 'low',
    headerName: 'Low',
    width: 100
  },
  {
    field: 'volume',
    headerName: 'Volume',
    flex: 1
  }
]

const Grid = ({ rowData }) => {
  return (
    <div className="ag-theme-alpine grid-container">
      <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
    </div>
  ) 
}

export default Grid