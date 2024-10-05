import getConfig from "../config/config";
import Config from "../config/config.model";
import createDBConnection from "../adapter/db/db";
import { Pool } from 'pg';

export default function InitCores():{
    config:Config,
} {
    const config:Config = getConfig();
    const db:Pool = createDBConnection(
        config.databaseConfig.user,
        config.databaseConfig.host,
        config.databaseConfig.database,
        config.databaseConfig.password,
        config.databaseConfig.port
    );
    return { config };
}