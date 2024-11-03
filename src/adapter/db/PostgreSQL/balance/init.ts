import { Pool } from "pg";

export default async function initializeBalanceTable(pool: Pool) {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS balance (
        user_id INTEGER PRIMARY KEY,
        balance NUMERIC(10, 2) NOT NULL,
        currency VARCHAR(3) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

  const triggerFunctionQuery = `
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `;

  const triggerQuery = `
      CREATE TRIGGER set_updated_at
      BEFORE UPDATE ON balance
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `;

  try {
    // Create the table if it does not exist
    await pool.query(createTableQuery);

    // Check if the trigger already exists
    const checkTriggerQuery = `
      SELECT 1
      FROM pg_trigger
      WHERE tgname = 'set_updated_at';
    `;

    const triggerExists = await pool.query(checkTriggerQuery);

    // Create the trigger function for updating 'updated_at' if it does not exist
    await pool.query(triggerFunctionQuery);

    // Create the trigger itself if it does not exist
    if (triggerExists.rowCount === 0) {
      await pool.query(triggerQuery);
    }

    console.log('Database initialized: "balance" table is ready.');
  } catch (error) {
    console.error("Error initializing balance table:", error);
  }
}
