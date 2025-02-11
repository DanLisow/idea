import { trpc } from "../../lib/trpc";

export const getMeTrpcRoute = trpc.procedure.query(({ ctx }) => {
  return { me: ctx.me && { id: ctx.me?.id, nick: ctx.me?.nick } };
});
