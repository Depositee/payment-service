import { Pool } from "pg";
import Payment from "./type";

export default class PaymentRepo {
    constructor(
        private pool:Pool
    ) {}
    async getPaymentHistoryByUserId(userId:number):Promise<Payment[]> {
        const result = await this.pool.query('SELECT * FROM payment WHERE sender_id = $1', [userId]);
        return result.rows;
    }
}