import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: Number(process.env.PORT) || 5000,
  node_env: process.env.NODE_ENV || "development",
  api_version: process.env.API_VERSION || "1.0.0",

  // Database
  database_url: process.env.MONGO_DB_URI || "",

  // CORS
  cors_origin: process.env.CORS_ORIGIN?.split(",") || [],
  frontend_url: process.env.FRONTEND_URL,
  cors_credentials: process.env.CORS_CREDENTIALS === "true",

  // Rate limit (number এ convert)
  rate_limit_window_ms: Number(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  rate_limit_max_requests: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,

  // JWT
  access_token_secret: process.env.ACCESS_TOKEN_SECRET || "",
  access_token_life: process.env.ACCESS_TOKEN_LIFE || "1d",
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET || "",
  refresh_token_life: process.env.REFRESH_TOKEN_LIFE || "30d",
};
