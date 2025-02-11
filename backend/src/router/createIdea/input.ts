import { z } from "zod";

export const zCreateIdeaTrpcInput = z.object({
  name: z.string().min(1, "Имя обязательно"),
  nick: z
    .string()
    .min(1, "Ник обязателен")
    .regex(/^[a-z0-9-]+$/, "Ник может содержать только прописные буквы, цифры и тире"),
  description: z.string().min(1, "Описание обязательно"),
  text: z.string().min(100, "Текст должен содержать не менее 100 символов"),
});
