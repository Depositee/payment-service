import GetPaymentHistoryByUserIdService from "../../service/getAllPaymentByUserId";
import AddBalanceService from "../../service/addBalance";
export default interface ServiceCores {
  getPaymentHistoryByUserIdService: GetPaymentHistoryByUserIdService;
  addBalanceService: AddBalanceService;
}
