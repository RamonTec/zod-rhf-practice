import * as React from "react";
import { useForm } from "react-hook-form";
import { Paper, Stack, TextField, Button, Typography } from "@mui/material";

type RHFOnly = {
  name: string;
  email: string;
  age: number;
  password: string;
  confirm: string;
};

export default function RHFOnlyForm() {
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } =
    useForm<RHFOnly>({ mode: "onSubmit" });

  const onSubmit = (values: RHFOnly) => {
    const { confirm, ...payload } = values;
    console.log("RHF-only payload", payload);
  };

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>RHF Only</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Name"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          />
          <TextField
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
          <TextField
            label="Age"
            type="number"
            {...register("age", {
              valueAsNumber: true,
              min: { value: 18, message: "Must be 18+" },
            })}
            error={!!errors.age}
            helperText={errors.age?.message}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            {...register("password", { minLength: { value: 8, message: "Min 8 characters" } })}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />
          <TextField
            label="Confirm password"
            type="password"
            {...register("confirm", {
              validate: v => v === getValues("password") || "Passwords do not match",
            })}
            error={!!errors.confirm}
            helperText={errors.confirm?.message}
            fullWidth
          />
          <Button type="submit" variant="contained" disabled={isSubmitting}>Submit</Button>
        </Stack>
      </form>
    </Paper>
  );
}
