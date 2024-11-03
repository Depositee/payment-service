import { config as loadEnv } from "dotenv";
import Config from "./config.type";

// Load environment variables from .env file
loadEnv();

export default function getConfig(): Config {
  // Read values from environment variables
  const serverConfig = {
    host: process.env.SERVER_CONFIG_HOST || "localhost", // Default value
    port: parseInt(process.env.SERVER_CONFIG_PORT || "50051", 10), // Default value
  };

  const databaseConfig = {
    host: process.env.DATABASE_CONFIG_HOST || "localhost", // Default value
    port: parseInt(process.env.DATABASE_CONFIG_PORT || "5432", 10), // Default value
    database: process.env.DATABASE_CONFIG_DATABASE || "postgres", // Default value
    user: process.env.DATABASE_CONFIG_USER || "postgres", // Default value
    password: process.env.DATABASE_CONFIG_PASSWORD || "guest", // Default value
  };

  return new Config(serverConfig, databaseConfig);
}
