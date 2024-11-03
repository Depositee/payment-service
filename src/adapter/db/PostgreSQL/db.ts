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

export function initPostGreSQLDB(pool: Pool): void {
  pool.query(
    "CREATE TABLE IF NOT EXISTS payment (id SERIAL PRIMARY KEY, sender_id INT NOT NULL, receiver_id INT NOT NULL,amount INT NOT NULL,currency VARCHAR(3) NOT NULL, status VARCHAR(10) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
  );
  pool.query(
    "CREATE TABLE IF NOT EXISTS balance (id SERIAL PRIMARY KEY, user_id INT NOT NULL, balance INT NOT NULL,currency VARCHAR(3) NOT NULL,  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
  );
}
