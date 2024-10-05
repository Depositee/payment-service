import { Pool } from 'pg';
import DB from './type';

export default function createDBConnection(
    user: string,
    host: string,
    database: string,
    password: string,
    port: number
): DB {
    return new Pool({
        user: user,
        host: host,
        database: database,
        password: password,
        port: port,
    });
}