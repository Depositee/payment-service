import PaymentRepo from "../../adapter/db/PostgreSQL/payment/repo";
import BalanceRepo from "../../adapter/db/PostgreSQL/balance/repo";
import { Pool } from "pg";

export default interface AdapterCores {
  db: dbCore;
}

interface dbCore {
  postgresql: postgresqlCore;
}

interface postgresqlCore {
  pool: Pool;
  paymentRepo: PaymentRepo;
  balanceRepo: BalanceRepo;
}
