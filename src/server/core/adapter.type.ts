import PaymentRepo from "../../adapter/db/PostgreSQL/payment/repo";
import BalanceRepo from "../../adapter/db/PostgreSQL/balance/repo";

export default interface AdapterCores {
  db: dbCore;
}

interface dbCore {
  postgresql: postgresqlCore;
}

interface postgresqlCore {
  paymentRepo: PaymentRepo;
  balanceRepo: BalanceRepo;
}
