import initializePaymentTable from "./payment/init";
import initializeBalanceTable from "./balance/init";
import { Pool } from "pg";
export default async function initPostGreSQLDB(pool: Pool): Promise<void> {
  await initializePaymentTable(pool);
  await initializeBalanceTable(pool);
}
