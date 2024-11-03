import PaymentRepo from "../../adapter/db/PostgreSQL/payment/repo";
import BalanceRepo from "../../adapter/db/PostgreSQL/balance/repo";
import AdapterCores from "./adapter.type";
import { Pool } from "pg";

export default function InitAdapterCore(pool: Pool): AdapterCores {
  return {
    db: {
      postgresql: {
        paymentRepo: new PaymentRepo(pool),
        balanceRepo: new BalanceRepo(pool),
      },
    },
  };
}
