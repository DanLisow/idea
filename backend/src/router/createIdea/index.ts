import { trpc } from "../../lib/trpc";
import { zCreateIdeaTrpcInput } from "./input";

export const createIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaTrpcInput).mutation(async ({ input, ctx }) => {
  if (!ctx.me) {
    throw new Error("Пользователь не авторизован");
  }

  const existIdea = await ctx.prisma.idea.findUnique({
    where: {
      nick: input.nick,
    },
  });

  if (existIdea) {
    throw new Error("Такой ник уже существует");
  }

  await ctx.prisma.idea.create({
    data: { ...input, authorId: ctx.me.id },
  });

  return true;
});
