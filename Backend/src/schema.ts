// zodSchemas.ts
import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  firstname: z.string().min(3, { message: "Username must be at least 3 characters" }),
  lastname: z.string().min(3, { message: "Username must be at least 3 characters" }),
});

export const LoginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  email: z.string().email({ message: "Invalid email format" }),

});
