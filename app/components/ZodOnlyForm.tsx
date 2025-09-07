import * as React from "react";
import { Paper, Stack, TextField, Button, Typography } from "@mui/material";
import { UserFormSchema, type UserFormInput } from "../schemas/user";

export default function ZodOnlyForm() {
  const [values, setValues] = React.useState<UserFormInput>({
    name: "", email: "", age: "" as unknown as number, password: "", confirm: ""
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = UserFormSchema.safeParse(values);
    if (!parsed.success) {
      const flat = parsed.error.flatten();
      const fieldErrors: Record<string, string> = {};
      for (const [k, msgs] of Object.entries(flat.fieldErrors)) {
        if (msgs && msgs[0]) fieldErrors[k] = msgs[0]!;
      }
      if (flat.formErrors[0]) fieldErrors["_"] = flat.formErrors[0]!;
      setErrors(fieldErrors);
      return;
    }
    const { confirm, ...payload } = parsed.data;
    console.log("Zod-only payload", payload);
    setErrors({});
  }

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Zod Only</Typography>
      <form onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Name" name="name" value={values.name} onChange={handleChange}
            error={!!errors.name} helperText={errors.name} fullWidth
          />
          <TextField
            label="Email" name="email" value={values.email} onChange={handleChange}
            error={!!errors.email} helperText={errors.email} fullWidth
          />
          <TextField
            label="Age" name="age" type="number" value={(values.age as any) ?? ""} onChange={handleChange}
            error={!!errors.age} helperText={errors.age} fullWidth
          />
          <TextField
            label="Password" name="password" type="password" value={values.password} onChange={handleChange}
            error={!!errors.password} helperText={errors.password} fullWidth
          />
          <TextField
            label="Confirm password" name="confirm" type="password" value={values.confirm} onChange={handleChange}
            error={!!errors.confirm} helperText={errors.confirm} fullWidth
          />
          <Button type="submit" variant="contained">Submit</Button>
          {errors._ && <Typography color="error">{errors._}</Typography>}
        </Stack>
      </form>
    </Paper>
  );
}
