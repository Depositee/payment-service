import { Pool } from "pg";

export default async function initializePaymentTable(pool: Pool) {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS payment (
      id SERIAL PRIMARY KEY,
      sender_id VARCHAR(48) NOT NULL,
      reciver_id VARCHAR(48) NOT NULL,
      amount NUMERIC(10, 2) NOT NULL,
      currency VARCHAR(3) NOT NULL,
      payment_date TIMESTAMPTZ,
      status VARCHAR(50) NOT NULL,
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
    BEFORE UPDATE ON payment
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `;

  const checkTriggerQuery = `
    SELECT EXISTS (
      SELECT 1 FROM pg_trigger
      WHERE tgname = 'set_updated_at'
    );
  `;

  try {
    // Create the table
    await pool.query(createTableQuery);
    // Create the trigger function
    await pool.query(triggerFunctionQuery);

    // Check if the trigger exists
    const result = await pool.query(checkTriggerQuery);
    const triggerExists = result.rows[0].exists;

    if (!triggerExists) {
      // Create the trigger only if it doesn't exist
      await pool.query(triggerQuery);
      console.log('Trigger "set_updated_at" created for the "payment" table.');
    } else {
      console.log(
        'Trigger "set_updated_at" already exists, skipping creation.'
      );
    }

    console.log('Database initialized: "payment" table is ready.');
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}
