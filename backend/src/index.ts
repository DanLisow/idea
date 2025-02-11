import express from "express";
import { trpcRouter } from "./router";
import cors from "cors";
import { applyTrpcToExpressApp } from "./lib/trpc";
import { type AppContext, createAppContext } from "./lib/ctx";
import { applyPassportToExpressApp } from "./lib/passport";
import { env } from "./lib/env";

let ctx: AppContext | null = null;

(async () => {
  try {
    ctx = createAppContext();
    const expressApp = express();
    expressApp.use(cors());
    expressApp.get("/ping", (req, res) => {
      res.send("pong");
    });

    applyPassportToExpressApp(expressApp, ctx);

    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter);

    expressApp.listen(env.PORT, () => {
      console.info(`Listening at http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.info(error);
    ctx?.stop();
  }
})();
