import AdapterCores from "./adapter.type";
import ServiceCores from "./service.type";
import GetPaymentHistoryByUserIdService from "../../service/getAllPaymentByUserId";
import GetBalanceByUserIdService from "../../service/getBalanceByUserId";
import AddBalanceService from "../../service/addBalance";
export default function initServiceCore(
  adapterCores: AdapterCores
): ServiceCores {
  return {
    getPaymentHistoryByUserIdService: new GetPaymentHistoryByUserIdService(
      adapterCores.db.postgresql.paymentRepo
    ),
    addBalanceService: new AddBalanceService(
      adapterCores.db.postgresql.balanceRepo
    ),
    getBalanceByUserIdService: new GetBalanceByUserIdService(
      adapterCores.db.postgresql.balanceRepo
    ),
  };
}
