import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { type Express } from "express";
import { type TrpcRouter } from "../router";
import { type AppContext } from "./ctx";
import { type ExpressRequest } from "../utils/types";
import superjson from "superjson";
const expressHandler = import("trpc-playground/handlers/express");

const getCreateTrpcContext = (appContext: AppContext) => {
  return ({ req }: trpcExpress.CreateExpressContextOptions) => {
    return {
      ...appContext,
      me: (req as ExpressRequest).user || null,
    };
  };
};

type TrpcContext = inferAsyncReturnType<ReturnType<typeof getCreateTrpcContext>>;

export const trpc = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const applyTrpcToExpressApp = async (expressApp: Express, appContext: AppContext, trpcRouter: TrpcRouter) => {
  expressApp.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: getCreateTrpcContext(appContext),
    })
  );

  expressApp.use(
    "/trpc-playground",
    await (
      await expressHandler
    ).expressHandler({
      trpcApiEndpoint: "/trpc",
      playgroundEndpoint: "/trpc-playground",
      router: trpcRouter,
      request: {
        superjson: true,
      },
    })
  );
};
