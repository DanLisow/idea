import { trpc } from "../../lib/trpc";
import { zSignInTrpcInput } from "./input";
import { getPasswordHash } from "../../utils/getPasswordHash";
import { signJWT } from "../../utils/signJWT";

export const signInTrpcRoute = trpc.procedure.input(zSignInTrpcInput).mutation(async ({ input, ctx }) => {
  const user = await ctx.prisma.user.findFirst({
    where: {
      nick: input.nick,
      password: getPasswordHash(input.password),
    },
  });

  if (!user) {
    throw new Error("Неверный ник или пароль");
  }

  const token = signJWT(user.id);

  return { token };
});
