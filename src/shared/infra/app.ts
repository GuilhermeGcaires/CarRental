import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import "express-async-errors"
import "dotenv/config";

import "@shared/infra/typeorm/data-source";

import "@shared/container"

import { AppError } from "@shared/errors/AppError";
import swaggerFile from "../../swagger.json";
import { router } from "./http/routes";
import upload from "@config/upload";
import rateLimiter from "@shared/infra/http/middlewares/rateLimiter"
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

const app = express();

app.use(rateLimiter)

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],

  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());

app.use(express.json());

app.use(Sentry.Handlers.tracingHandler());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`))
app.use("/cars", express.static(`${upload.tmpFolder}/cars`))


app.use(router);

app.use(Sentry.Handlers.errorHandler());

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  }
  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  })
})

export { app }