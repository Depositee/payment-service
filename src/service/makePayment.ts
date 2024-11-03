import PaymentRepo from "../adapter/db/PostgreSQL/payment/repo";
import BalanceRepo from "../adapter/db/PostgreSQL/balance/repo";
import { Pool } from "pg";
import Payment from "../adapter/db/PostgreSQL/payment/type";

export class MakePaymentService {
  constructor(
    private pool: Pool,
    private paymentRepo: PaymentRepo,
    private balanceRepo: BalanceRepo
  ) {}
  async Handle(
    senderId: number,
    receiverId: number,
    amount: number
  ): Promise<Payment> {
    const senderBalance = await this.balanceRepo.getBalanceByUserId(senderId);
    if (senderBalance.balance < amount) {
      throw new Error("Insufficient balance");
    }
    const receiverBalance = await this.balanceRepo.getBalanceByUserId(
      receiverId
    );
    try {
      this, await this.pool.query("BEGIN");
      await this.balanceRepo.updateBalanceByUserId(
        senderId,
        senderBalance.balance - amount
      );
      await this.balanceRepo.updateBalanceByUserId(
        receiverId,
        receiverBalance.balance + amount
      );
      const result = this.paymentRepo.createPaymentHistory(
        senderId,
        receiverId,
        amount,
        "THB"
      );
      this, await this.pool.query("COMMIT");
      return result;
    } catch (e) {
      this, await this.pool.query("ROLLBACK");
      throw e;
    }
  }
}
