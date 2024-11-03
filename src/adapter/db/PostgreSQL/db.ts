import { Pool } from "pg";

export default function createPostgreSQLDBConnection(
  user: string,
  host: string,
  database: string,
  password: string,
  port: number
): Pool {
  return new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
  });
}
