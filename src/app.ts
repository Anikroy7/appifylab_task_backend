import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import status from 'http-status';
import { rateLimit } from 'express-rate-limit';
import config from "./app/config";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";


const app: Application = express();

// CORS configuration
const corsOptions = {
  origin: config.cors_origin,
  credentials: config.cors_credentials,
};


// Rate limiting configuration
const rateLimitOptions = {
  windowMs: config.rate_limit_window_ms,
  max: config.rate_limit_max_requests,
};


// Core middlewares
app.use(express.json());

const coreMiddlewares = [
  morgan(config.node_env),
  helmet(),
  hpp(),
  cors(corsOptions),
  express.urlencoded({ extended: true }),
  rateLimit(rateLimitOptions),
  // Sanitization middleware
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const sanitize = (obj: any): any => {
      if (!obj || typeof obj !== 'object') return obj;

      const result: Record<string, any> = Array.isArray(obj) ? [] : {};

      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const sanitizedKey = key.replace(/^\$/, '_');
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            result[sanitizedKey] = sanitize(obj[key]);
          } else {
            result[sanitizedKey] = obj[key];
          }
        }
      }

      return result;
    };

    if (req.body && typeof req.body === 'object') {
      req.body = sanitize(req.body);
    }
    next();
  },
];


// Use middlewares
app.use(coreMiddlewares);


// Routes
app.use("/api/v1", router);


// Base route
app.get(['/', '/api/v1', '/health'], (req, res) => {
  res.status(status.OK).json({
    path: req.path,
    message: 'Welcome to our platfrom API',
    status: 'healthy',
    environment: config.node_env,
    version: config.api_version,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: {
      database: 'connected',
      api: 'operational',
    },
  });
});


//Global middleware
app.use(globalErrorHandler);

//Not Found
app.use(notFound);


export default app;