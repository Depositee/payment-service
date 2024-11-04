import PaymentRepo from "../adapter/db/PostgreSQL/payment/repo";
import BalanceRepo from "../adapter/db/PostgreSQL/balance/repo";
import { Pool } from "pg";
import { PoolClient } from "pg";
import Payment from "../adapter/db/PostgreSQL/payment/type";

export default class MakePaymentService {
  constructor(
    private pool: Pool,
    private paymentRepo: PaymentRepo,
    private balanceRepo: BalanceRepo
  ) {}
  async Handle(
    senderId: string,
    receiverId: string,
    amount: number
  ): Promise<Payment> {
    const poolClient = await this.pool.connect();
    const senderBalance = await this.balanceRepo.getBalanceByUserId(senderId);
    if (senderBalance.balance < amount) {
      throw new Error("Insufficient balance");
    }
    const receiverBalance = await this.balanceRepo.getBalanceByUserId(
      receiverId
    );
    try {
      await this.pool.query("BEGIN");
      await this.balanceRepo.updateBalanceByUserId(
        senderId,
        Number(senderBalance.balance) - Number(amount),
        poolClient
      );
      await this.balanceRepo.updateBalanceByUserId(
        receiverId,
        Number(receiverBalance.balance) + Number(amount),
        poolClient
      );
      const result = this.paymentRepo.createPaymentHistory(
        senderId,
        receiverId,
        amount,
        "THB",
        undefined,
        poolClient
      );
      await poolClient.query("COMMIT");
      return result;
    } catch (e) {
      await poolClient.query("ROLLBACK");
      throw e;
    } finally {
      poolClient.release(); // Release the client back to the pool
    }
  }
}
