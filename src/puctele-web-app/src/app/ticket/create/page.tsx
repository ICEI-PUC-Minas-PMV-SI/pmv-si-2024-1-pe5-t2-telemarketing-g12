'use client';

import { Autocomplete, Box, TextField } from '@mui/material';
import { Create, useAutocomplete } from '@refinedev/mui';
import { useForm } from '@refinedev/react-hook-form';
import { Controller } from 'react-hook-form';

import ptBR from '@locales/pt-br/common.json';
import { useList } from '@refinedev/core';

export default function TicketCreate() {
  const {
    saveButtonProps,
    refineCore: { formLoading, onFinish },
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  const { data: companyData, isLoading: companyIsLoading } = useList({
    resource: 'company',
    pagination: { current: 1, pageSize: 300 },
  });

  const { autocompleteProps: productAutocompleteProps } = useAutocomplete({
    resource: 'product',
    pagination: { current: 1, pageSize: 300 },
  });

  const { autocompleteProps: userAutocompleteProps } = useAutocomplete({
    resource: 'user',
    pagination: { current: 1, pageSize: 300 },
  });

  const { autocompleteProps: clientAutocompleteProps } = useAutocomplete({
    resource: 'client',
    pagination: { current: 1, pageSize: 2000 },
  });

  const priorityList = Object.entries(ptBR.ticket.priority).map((item) => {
    return { id: item[0], label: item[1] };
  });
  const statusList = Object.entries(ptBR.ticket.status).map((item) => {
    return { id: item[0], label: item[1] };
  });
  const typeList = Object.entries(ptBR.ticket.type).map((item) => {
    return { id: item[0], label: item[1] };
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }} autoComplete="off">
        <Controller
          control={control}
          name={'clientId'}
          rules={{ required: 'This field is required' }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...clientAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value.id);
              }}
              getOptionLabel={(item) => {
                return (
                  clientAutocompleteProps?.options
                    ?.find((p) => {
                      const itemId = typeof item === 'object' ? item?.id?.toString() : item?.toString();
                      const pId = p?.id?.toString();
                      return itemId === pId;
                    })
                    ?.name ?? ''
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.id?.toString();
                const valueId = typeof value === 'object' ? value?.toString() : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField {...params} label={'Cliente'} margin="normal" variant="outlined" error={!!(errors as any)?.userId} required />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name={'productId'}
          rules={{ required: 'This field is required' }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...productAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value.id);
              }}
              getOptionLabel={(item) => {
                const product = productAutocompleteProps?.options?.find((p) => {
                  const itemId = typeof item === 'object' ? item?.id?.toString() : item?.toString();
                  const pId = p?.id?.toString();
                  return itemId === pId;
                });
                const company = companyData?.data?.find((c) => {
                  return c?.id?.toString() === product?.companyId?.toString();
                });
                return `${company?.name} - ${product?.product}`;
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.id?.toString();
                const valueId = typeof value === 'object' ? value?.toString() : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField {...params} label={'Produto'} margin="normal" variant="outlined" error={!!(errors as any)?.productId} required />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name={'userId'}
          rules={{ required: 'This field is required' }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...userAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value.id);
              }}
              getOptionLabel={(item) => {
                return (
                  userAutocompleteProps?.options
                    ?.find((p) => {
                      const itemId = typeof item === 'object' ? item?.id?.toString() : item?.toString();
                      const pId = p?.id?.toString();
                      return itemId === pId;
                    })
                    ?.username.replace('.', ' ') ?? ''
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.id?.toString();
                const valueId = typeof value === 'object' ? value?.toString() : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField {...params} label={'Usuário'} margin="normal" variant="outlined" error={!!(errors as any)?.userId} required />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name="priority"
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={priorityList}
              getOptionLabel={(option) => {
                const itemId = typeof option === 'object' ? option?.id?.toString() : option?.toString();
                const entry = priorityList.find((item) => item.id === itemId);
                return entry?.label || '';
              }}
              onChange={(_, value) => {
                field.onChange(value.id);
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.id?.toString();
                const valueId = typeof value === 'object' ? value?.toString() : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => <TextField {...params} label="Prioridade" margin="normal" variant="outlined" required />}
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={statusList}
              getOptionLabel={(option) => {
                const itemId = typeof option === 'object' ? option?.id?.toString() : option?.toString();
                const entry = statusList.find((item) => item.id === itemId);
                return entry?.label || '';
              }}
              onChange={(_, value) => {
                field.onChange(value.id);
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.id?.toString();
                const valueId = typeof value === 'object' ? value?.toString() : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => <TextField {...params} label="Status" margin="normal" variant="outlined" required />}
            />
          )}
        />
        <Controller
          name="type"
          control={control}
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={typeList}
              getOptionLabel={(option) => {
                const itemId = typeof option === 'object' ? option?.id?.toString() : option?.toString();
                const entry = typeList.find((item) => item.id === itemId);
                return entry?.label || '';
              }}
              onChange={(_, value) => {
                field.onChange(value.id);
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.id?.toString();
                const valueId = typeof value === 'object' ? value?.toString() : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => <TextField {...params} label="Tipo" margin="normal" variant="outlined" required />}
            />
          )}
        />
        <TextField
          {...register('description', {
            required: 'This field is required',
          })}
          error={!!(errors as any)?.description}
          helperText={(errors as any)?.description?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          multiline
          label={'Descrição'}
          name="description"
          rows={4}
        />
      </Box>
    </Create>
  );
}
