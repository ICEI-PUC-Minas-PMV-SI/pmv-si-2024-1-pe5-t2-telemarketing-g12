'use client';

import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useList, useMany } from '@refinedev/core';
import { DateField, EditButton, List, MarkdownField, ShowButton, useDataGrid } from '@refinedev/mui';
import React from 'react';

import ptBR from '@locales/pt-br/common.json';

export default function TicketList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
  });

  const { data: productData, isLoading: productIsLoading } = useList({
    resource: 'product',
    pagination: {
      current: 1,
      pageSize: 25,
    },
  });

  const { data: clientData, isLoading: clientIsLoading } = useMany({
    resource: 'client',
    ids: dataGridProps?.rows?.map((item: any) => item?.clientId).filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const { data: userData, isLoading: userIsLoading } = useMany({
    resource: 'user',
    ids: dataGridProps?.rows?.map((item: any) => item?.userId).filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        type: 'number',
        maxWidth: 50,
      },
      {
        field: 'clientId',
        flex: 1,
        headerName: 'Cliente',
        minWidth: 300,
        valueGetter: ({ row }) => {
          const value = row?.clientId;
          return value;
        },
        renderCell: function render({ value }) {
          return clientIsLoading ? <>Loading...</> : clientData?.data?.find((item) => item.id === value)?.name;
        },
      },
      {
        field: 'productId',
        flex: 1,
        headerName: 'Produto',
        maxWidth: 200,
        valueGetter: ({ row }) => {
          const value = row?.productId;
          return value;
        },
        renderCell: function render({ value }) {
          return productIsLoading ? <>Loading...</> : productData?.data?.find((item) => item.id === value)?.product;
        },
      },
      {
        field: 'description',
        flex: 1,
        headerName: 'Descrição',
        minWidth: 380,
        renderCell: function render({ value }) {
          if (!value) return '-';
          return <MarkdownField value={value?.slice(0, 50) + '...' || ''} />;
        },
      },
      {
        field: 'priority',
        flex: 1,
        headerName: 'Prioridade',
        maxWidth: 200,
        renderCell: function render({ value }) {
          const entry = Object.entries(ptBR.ticket.priority).find((entry) => entry[0] == value) || [];
          return <>{entry[1]}</>;
        },
      },
      {
        field: 'userId',
        flex: 1,
        headerName: 'Usuário',
        minWidth: 200,
        renderCell: function render({ value }) {
          if (userIsLoading) {
            return <>Loading...</>;
          } else {
            const currentUser = userData?.data?.find((item) => item.id === value);
            return <>{`${currentUser?.firstName} ${currentUser?.lastName}`}</>;
          }
        },
      },
      {
        field: 'actions',
        headerName: 'Ações',
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: 'center',
        headerAlign: 'center',
        minWidth: 80,
      },
    ],
    [productData, clientData, userData]
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
}
