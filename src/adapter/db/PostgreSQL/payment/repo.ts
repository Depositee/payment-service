import { Pool, PoolClient } from "pg";
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
    currency: string,
    status: string = "completed",
    client?: PoolClient
  ): Promise<Payment> {
    if (client) {
      const result = await client.query(
        "INSERT INTO payment (sender_id, reciver_id, amount, currency,status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [senderId, receiverId, amount, currency, status]
      );
      return result.rows[0];
    }
    const result = await this.pool.query(
      "INSERT INTO payment (sender_id, reciver_id, amount, currency,status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [senderId, receiverId, amount, currency, status]
    );
    return result.rows[0];
  }
}
