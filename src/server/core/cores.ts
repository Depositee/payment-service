import getConfig from "../../config/config";
import Config from "../../config/config.type";
import createPostgreSQLDBConnection from "../../adapter/db/PostgreSQL/db";
import initPostGreSQLDB from "../../adapter/db/PostgreSQL/init";
import InitAdapterCore from "./adapter";
import initServiceCore from "./service";
import InitPortCore from "./port";
import PortCores from "./port.type";
import { Pool } from "pg";

export default async function InitCores(): Promise<{
  config: Config;
  portCore: PortCores;
}> {
  const config: Config = getConfig();
  const pool: Pool = createPostgreSQLDBConnection(
    config.databaseConfig.user,
    config.databaseConfig.host,
    config.databaseConfig.database,
    config.databaseConfig.password,
    config.databaseConfig.port
  );
  await initPostGreSQLDB(pool);
  const adapterCore = InitAdapterCore(pool);
  const serviceCore = initServiceCore(adapterCore);
  const portCore = InitPortCore(serviceCore);
  return {
    config,
    portCore,
  };
}
