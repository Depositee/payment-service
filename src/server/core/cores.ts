import getConfig from "../../config/config";
import Config from "../../config/config.type";
import createPostgreSQLDBConnection, {
  initPostGreSQLDB,
} from "../../adapter/db/PostgreSQL/db";
import InitAdapterCore from "./adapter";
import initServiceCore from "./service";
import InitPortCore from "./port";
import PortCores from "./port.type";
import { Pool } from "pg";

export default function InitCores(): {
  config: Config;
  portCore: PortCores;
} {
  const config: Config = getConfig();
  const pool: Pool = createPostgreSQLDBConnection(
    config.databaseConfig.user,
    config.databaseConfig.host,
    config.databaseConfig.database,
    config.databaseConfig.password,
    config.databaseConfig.port
  );
  initPostGreSQLDB(pool);
  const adapterCore = InitAdapterCore(pool);
  const serviceCore = initServiceCore(adapterCore);
  const portCore = InitPortCore(serviceCore);
  return {
    config,
    portCore,
  };
}
