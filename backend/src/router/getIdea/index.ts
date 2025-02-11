import z from "zod";
import { trpc } from "../../lib/trpc";

export const getIdeaTrpcRoute = trpc.procedure
  .input(
    z.object({
      ideaName: z.string(),
    })
  )
  .query(async ({ input, ctx }) => {
    const idea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.ideaName,
      },
      include: {
        author: {
          select: {
            id: true,
            nick: true,
          },
        },
      },
    });

    return { idea };
  });
