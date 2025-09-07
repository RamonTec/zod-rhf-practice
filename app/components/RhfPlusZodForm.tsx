import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paper, Stack, TextField, Button, Typography } from "@mui/material";
import { UserFormSchema, type UserFormInput } from "../schemas/user";

export default function RHFZodForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<UserFormInput>({
      resolver: zodResolver(UserFormSchema),
      mode: "onSubmit",
    });

  const onSubmit = (data: UserFormInput) => {
    const { confirm, ...payload } = data;
    console.log("RHF + Zod payload", payload);
  };

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>RHF + Zod</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Name" {...register("name")}
            error={!!errors.name} helperText={errors.name?.message} fullWidth
          />
          <TextField
            label="Email" {...register("email")}
            error={!!errors.email} helperText={errors.email?.message} fullWidth
          />
          <TextField
            label="Age" type="number" {...register("age")}
            error={!!errors.age} helperText={errors.age?.message} fullWidth
          />
          <TextField
            label="Password" type="password" {...register("password")}
            error={!!errors.password} helperText={errors.password?.message} fullWidth
          />
          <TextField
            label="Confirm password" type="password" {...register("confirm")}
            error={!!errors.confirm} helperText={errors.confirm?.message} fullWidth
          />
          <Button type="submit" variant="contained" disabled={isSubmitting}>Submit</Button>
        </Stack>
      </form>
    </Paper>
  );
}
