"use client";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

export default function ClientList() {
  const { dataGridProps } = useDataGrid({
    initialCurrent:0,
    initialPageSize: 50,
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
      },
      {
        field: "name",
        flex: 1,
        headerName: "Nome",
        minWidth: 200,
      },
      {
        field: "email",
        flex: 1,
        headerName: "Email",
        minWidth: 300,
      },
      {
        field: "phone",
        flex: 1,
        headerName: "Telefone",
        minWidth: 200,
      },
      {
        field: "birthDate",
        flex: 1,
        headerName: "Data de nascimento",
        minWidth: 200,
      },
      {
        field: "cpf",
        flex: 1,
        headerName: "CPF",
        minWidth: 200,
      },
      {
        field: "cep",
        flex: 1,
        headerName: "CEP",
        minWidth: 200,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
}
