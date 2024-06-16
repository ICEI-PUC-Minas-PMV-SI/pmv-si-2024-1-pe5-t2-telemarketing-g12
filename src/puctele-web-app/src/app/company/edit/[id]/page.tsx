"use client";

import { Box, TextField } from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

export default function CompanyEdit() {
  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("name", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.name}
          helperText={(errors as any)?.name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Nome"}
          name="name"
        />
         <TextField
          {...register("email", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.email}
          helperText={(errors as any)?.email?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Email"}
          name="email"
        />
         <TextField
          {...register("phone", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.phone}
          helperText={(errors as any)?.phone?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Telefone"}
          name="phone"
        />
         <TextField
          {...register("cnpj", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.cnpj}
          helperText={(errors as any)?.cnpj?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"CNPJ"}
          name="cnpj"
        />
         <TextField
          {...register("cep", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.cep}
          helperText={(errors as any)?.cep?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"CEP"}
          name="cep"
        />
         <TextField
          {...register("address", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.address}
          helperText={(errors as any)?.address?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Endereço"}
          name="address"
        />
         <TextField
          {...register("number", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.number}
          helperText={(errors as any)?.number?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={"Número"}
          name="number"
        />
         <TextField
          {...register("district", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.district}
          helperText={(errors as any)?.district?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Bairro"}
          name="district"
        />
         <TextField
          {...register("city", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.city}
          helperText={(errors as any)?.city?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Cidade"}
          name="city"
        />
         <TextField
          {...register("state", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.state}
          helperText={(errors as any)?.state?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Estado"}
          name="state"
        />
      </Box>
    </Edit>
  );
}
