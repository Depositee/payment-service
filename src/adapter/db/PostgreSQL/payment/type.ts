export default interface Payment {
  id: number;
  sender_id: number;
  reciver_id: number;
  amount: number;
  currency: string;
  payment_date?: Date;
  status: string;
  created_at: Date;
  updated_at: Date;
}
