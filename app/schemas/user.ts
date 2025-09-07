import { z } from "zod";

export const UserFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  age: z.coerce.number().int().min(18, "Must be 18+"),
  password: z.string().min(8, "Min 8 characters"),
  confirm: z.string(),
}).superRefine(({ password, confirm }, ctx) => {
  if (password !== confirm) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["confirm"], message: "Passwords do not match" });
  }
});

export type UserFormInput = z.input<typeof UserFormSchema>;
export type UserFormOutput = z.output<typeof UserFormSchema>;
