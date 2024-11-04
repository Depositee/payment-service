import PaymentRepo from "../adapter/db/PostgreSQL/payment/repo";
import Payment from "../adapter/db/PostgreSQL/payment/type";

export default class GetPaymentHistoryByUserIdService {
  constructor(private paymentRepo: PaymentRepo) {}
  async Handle(userId: string): Promise<Payment[]> {
    const result = await this.paymentRepo.getPaymentHistoryByUserId(userId);
    return result;
  }
}
