
import { z } from "zod";

export async function safeFetch<T>(url: string, schema: z.ZodSchema<T>): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return schema.parse(json);
}
