import * as React from "react";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const columns = [
  {
    field: "start",
    headerName: "From",
    width: 200,
    valueGetter: (params) => {
      const time = new Date(params.row.start);
      return `${time.toLocaleString()}`;
    },
    sortable: false,
  },
  {
    field: "end",
    headerName: "To",
    width: 200,
    valueGetter: (params) => {
      const time = new Date(params.row.end);
      return `${time.toLocaleString()}`;
    },
    sortable: false,
  },
  { field: "notes", headerName: "Notes", width: 150, sortable: false },
  //   { field: "id", headerName: "ID", width: 70 },
  //   { field: "firstName", headerName: "First name", width: 130 },
  //   { field: "lastName", headerName: "Last name", width: 130 },
  //   {
  //     field: "age",
  //     headerName: "Age",
  //     type: "number",
  //     width: 90,
  //   },
  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  //   },
];

const rows = [
  { id: 1, notes: "These are some sleep notes" },
  { id: 2, notes: "These are some sleep notes" },
  //   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  //   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  //   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  //   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  //   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  //   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  //   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  //   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  //   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function SleepTable({ sleeps }) {
  //   useEffect(() => {
  //     console.log(sleeps);
  //     if (sleeps && sleeps[0]) {
  //       console.log(sleeps[0]);
  //     }
  //   }, [sleeps]);

  return sleeps ? (
    <Box sx={{ height: 400, width: "100%", p: 3 }}>
      <DataGrid
        rows={sleeps.map(({ id, notes, start_dt, end_dt }) => {
          return {
            id,
            notes,
            start: start_dt,
            end: end_dt,
          };
        })}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Box>
  ) : null;
}
