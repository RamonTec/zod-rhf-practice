import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  age: z.number(),
});

// note email here is deprecated
export const UserSchemaV2 = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  age: z.number().int().positive("Age must be a positive integer"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
