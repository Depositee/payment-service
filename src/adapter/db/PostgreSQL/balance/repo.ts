import { Pool, PoolClient } from "pg";
import Balance from "./type";

export default class BalanceRepo {
  constructor(private pool: Pool) {}
  async getBalanceByUserId(userId: string): Promise<Balance> {
    const result = await this.pool.query(
      "SELECT * FROM balance WHERE user_id = $1",
      [userId]
    );
    return result.rows[0];
  }
  async updateBalanceByUserId(
    userId: string,
    balance: number,
    client?: PoolClient
  ): Promise<Balance> {
    if (client) {
      const result = await client.query(
        "UPDATE balance SET balance = $1 WHERE user_id = $2 RETURNING *",
        [balance, userId]
      );
      return result.rows[0];
    }
    const result = await this.pool.query(
      "UPDATE balance SET balance = $1 WHERE user_id = $2 RETURNING *",
      [balance, userId]
    );
    return result.rows[0];
  }
  async createBalance(
    userId: string,
    balance: number,
    currency: string
  ): Promise<Balance> {
    const result = await this.pool.query(
      "INSERT INTO balance (user_id, balance, currency) VALUES ($1, $2, $3) RETURNING *",
      [userId, balance, currency]
    );
    return result.rows[0];
  }
  async deleteBalanceByUserId(userId: number): Promise<void> {
    await this.pool.query("DELETE FROM balance WHERE user_id = $1", [userId]);
  }
}
