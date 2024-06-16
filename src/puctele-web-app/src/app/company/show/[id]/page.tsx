"use client";

import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";

export default function CompanyShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {"ID"}
        </Typography>
        <TextField value={record?.id} />

        <Typography variant="body1" fontWeight="bold">
          {"Nome"}
        </Typography>
        <TextField value={record?.name} />

        <Typography variant="body1" fontWeight="bold">
          {"Email"}
        </Typography>
        <TextField value={record?.email} />

        <Typography variant="body1" fontWeight="bold">
          {"Telefone"}
        </Typography>
        <TextField value={record?.phone} />

        <Typography variant="body1" fontWeight="bold">
          {"CNPJ"}
        </Typography>
        <TextField value={record?.cnpj} />

        <Typography variant="body1" fontWeight="bold">
          {"CEP"}
        </Typography>
        <TextField value={record?.cep} />

        <Typography variant="body1" fontWeight="bold">
          {"Endereço"}
        </Typography>
        <TextField value={record?.address} />

        <Typography variant="body1" fontWeight="bold">
          {"Número"}
        </Typography>
        <TextField value={record?.number} />

        <Typography variant="body1" fontWeight="bold">
          {"Bairro"}
        </Typography>
        <TextField value={record?.district} />

        <Typography variant="body1" fontWeight="bold">
          {"Cidade"}
        </Typography>
        <TextField value={record?.city} />

        
        <Typography variant="body1" fontWeight="bold">
          {"Estado"}
        </Typography>
        <TextField value={record?.state} />

      </Stack>
    </Show>
  );
}
