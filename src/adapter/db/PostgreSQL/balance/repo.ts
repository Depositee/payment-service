import { Pool } from "pg";
import Balance from "./type";

export default class BalanceRepo {
  constructor(private pool: Pool) {}
  async getBalanceByUserId(userId: number): Promise<Balance> {
    const result = await this.pool.query(
      "SELECT * FROM balance WHERE user_id = $1",
      [userId]
    );
    return result.rows[0];
  }
  async updateBalanceByUserId(userId: number, balance: number): Promise<void> {
    await this.pool.query(
      "UPDATE balance SET balance = $1 WHERE user_id = $2",
      [balance, userId]
    );
  }
  async createBalance(
    userId: number,
    balance: number,
    currency: string
  ): Promise<void> {
    await this.pool.query(
      "INSERT INTO balance (user_id, balance, currency) VALUES ($1, $2, $3)",
      [userId, balance, currency]
    );
  }
  async deleteBalanceByUserId(userId: number): Promise<void> {
    await this.pool.query("DELETE FROM balance WHERE user_id = $1", [userId]);
  }
}
