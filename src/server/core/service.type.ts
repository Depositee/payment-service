import GetPaymentHistoryByUserIdService from "../../service/getAllPaymentByUserId";
import AddBalanceService from "../../service/addBalance";
import GetBalanceByUserIdService from "../../service/getBalanceByUserId";
export default interface ServiceCores {
  getPaymentHistoryByUserIdService: GetPaymentHistoryByUserIdService;
  addBalanceService: AddBalanceService;
  getBalanceByUserIdService: GetBalanceByUserIdService;
}
