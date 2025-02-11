import { z } from "zod";

export const zSignUpTrpcInput = z.object({
  nick: z
    .string()
    .min(4, "Ник должен быть не менее 4 символов")
    .regex(/^[a-z0-9-]+$/, "Ник может содержать только цифры, строчные буквы и тире"),
  password: z.string().min(1),
});
