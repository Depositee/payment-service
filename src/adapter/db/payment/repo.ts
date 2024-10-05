import DB from "../type";

export interface Payment{
    id:number;
    sender_id:number;
    reciver_id:number;
    amount:number;
    currency:string;
    payment_date:Date;
    status:string;
    created_at:Date;
    updated_at:Date;
}

export default class PaymentRepo {
    constructor(
        private db:DB
    ) {}
    async getPaymentHistoryByUserId(userId:number):Promise<Payment[]> {
        const result = await this.db.query('SELECT * FROM payments WHERE user_id = $1', [userId]);
        return result.rows;
    }
}