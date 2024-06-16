"use client";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useList, useMany } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

export default function ProductList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
    initialCurrent:0,
    initialPageSize: 50,
  });

  const { data: companiesData, isLoading: companiesIsLoading } = useList({
    resource: "company"
    }
    );

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
      },
      {
        field: "product",
        flex: 1,
        headerName: "Produto",
        minWidth: 200,
      },
      {
        field: "phone",
        flex: 1,
        headerName: "Telefone",
        minWidth: 200,
      },
      {
        field: "contactName",
        flex: 1,
        headerName: "Contato Responsável",
        minWidth: 200,
      },
      {
        field: "companyId",
        flex: 1,
        headerName: "Companhia",
        minWidth: 300,
        valueGetter: ({ row }) => {
          const value = row?.companyId;
          return value;
        },
        renderCell: function render({ value }) {
          return companiesIsLoading ? (
            <>Loading...</>
          ) : (
            companiesData?.data?.find((item) => item.id === value)?.name
          );
        },
      },
      {
        field: "createdAt",
        flex: 1,
        headerName: "Created at",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
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
    [companiesData]
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
}
