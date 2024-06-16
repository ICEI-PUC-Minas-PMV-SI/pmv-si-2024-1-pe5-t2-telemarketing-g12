'use client';

import { Stack, Typography } from '@mui/material';
import { useList, useOne, useShow } from '@refinedev/core';
import { DateField, MarkdownField, Show, TextFieldComponent as TextField } from '@refinedev/mui';

import ptBR from '@locales/pt-br/common.json';

export default function TicketShow() {
  const { queryResult } = useShow({});

  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: productData, isLoading: productIsLoading } = useOne({
    resource: 'product',
    id: record?.productId || '',
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: clientData, isLoading: clientIsLoading } = useOne({
    resource: 'client',
    id: record?.clientId || '',
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: userData, isLoading: userIsLoading } = useOne({
    resource: 'user',
    id: record?.userId || '',
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: companyData, isLoading: companyIsLoading } = useList({
    resource: 'company',
    pagination: { current: 1, pageSize: 300 },
  });

  const getCompanyName = (companyId: number) => {
    const company = companyData?.data?.find((c) => {
      return c?.id == companyId
    });
    return company?.name
  };

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {'ID'}
        </Typography>
        <TextField value={record?.id} />

        <Typography variant="body1" fontWeight="bold">
          {'Cliente'}
        </Typography>
        {clientIsLoading ? <>Loading...</> : <TextField value={clientData?.data?.name} />}

        <Typography variant="body1" fontWeight="bold">
          {'Produto'}
        </Typography>
        {productIsLoading ? <>Loading...</> : <TextField value={`${getCompanyName(productData?.data?.companyId)} - ${productData?.data?.product}`} />}

        <Typography variant="body1" fontWeight="bold">
          {'Usuário'}
        </Typography>
        {userIsLoading ? <>Loading...</> : <TextField value={userData?.data?.username.replace('.', ' ')} />}

        <Typography variant="body1" fontWeight="bold">
          {'Status'}
        </Typography>
        <TextField value={Object.entries(ptBR.ticket.status).find((entry) => entry[0] == record?.status)?.[1] || ''} />

          
        <Typography variant="body1" fontWeight="bold">
          {'Prioridade'}
        </Typography>
        <TextField value={Object.entries(ptBR.ticket.priority).find((entry) => entry[0] == record?.priority)?.[1] || ''} />

          
        <Typography variant="body1" fontWeight="bold">
          {'Tipo'}
        </Typography>
        <TextField value={Object.entries(ptBR.ticket.type).find((entry) => entry[0] == record?.type)?.[1] || ''} />

        <Typography variant="body1" fontWeight="bold">
          {'Descrição'}
        </Typography>
        <MarkdownField value={record?.description} />

        <Typography variant="body1" fontWeight="bold">
          {'Data da chamada'}
        </Typography>
        <DateField value={record?.createdAt} />
      </Stack>
    </Show>
  );
}
