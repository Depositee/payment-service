import { Pool } from "pg";
import Payment from "./type";

export default class PaymentRepo {
  constructor(private pool: Pool) {}
  async getPaymentHistoryByUserId(userId: number): Promise<Payment[]> {
    const result = await this.pool.query(
      "SELECT * FROM payment WHERE sender_id = $1",
      [userId]
    );
    return result.rows;
  }
  async createPaymentHistory(
    senderId: number,
    receiverId: number,
    amount: number,
    currency: string
  ): Promise<void> {
    await this.pool.query(
      "INSERT INTO payment (sender_id, receiver_id, amount, currency) VALUES ($1, $2, $3, $4)",
      [senderId, receiverId, amount, currency]
    );
  }
}
