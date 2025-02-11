import { type Express } from "express";
import { type AppContext } from "./ctx";
import { Passport } from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { env } from "./env";

export const applyPassportToExpressApp = (expressApp: Express, ctx: AppContext) => {
  const passport = new Passport();

  passport.use(
    new JwtStrategy(
      {
        secretOrKey: env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      function (jwt_payload: string, done) {
        ctx.prisma.user
          .findUnique({
            where: {
              id: jwt_payload,
            },
          })
          .then((user) => {
            if (!user) {
              done(null, false);

              return;
            }

            done(null, user);
          })
          .catch((error) => {
            done(error, false);
          });
      }
    )
  );

  expressApp.use((req, res, next) => {
    if (!req.headers.authorization) {
      next();

      return;
    }

    passport.authenticate("jwt", { session: false }, (...args: any[]) => {
      req.user = args[1] || undefined;
      next();
    })(req, res, next);
  });
};
