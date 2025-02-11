import { trpc } from "../../lib/trpc";
import { zUpdateIdeaTrpcInput } from "./input";

export const updateIdeaTrpcRoute = trpc.procedure.input(zUpdateIdeaTrpcInput).mutation(async ({ input, ctx }) => {
  const { ideaId, ...inputIdea } = input;

  if (!ctx.me) {
    throw new Error("Пользователь не авторизован");
  }

  const idea = await ctx.prisma.idea.findUnique({
    where: {
      id: ideaId,
    },
  });

  if (!idea) {
    throw new Error("Такой идеи не существует");
  }

  if (ctx.me.id !== idea.authorId) {
    throw new Error("Вы не можете редактировать чужие идеи");
  }

  if (idea.nick !== input.nick) {
    const exIdea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.nick,
      },
    });

    if (exIdea) {
      throw new Error("Такая идея уже существует");
    }
  }

  await ctx.prisma.idea.update({
    where: {
      id: ideaId,
    },
    data: {
      ...inputIdea,
    },
  });

  return true;
});
