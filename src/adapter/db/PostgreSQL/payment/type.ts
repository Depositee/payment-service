export default interface Payment {
  id: number;
  sender_id: string;
  reciver_id: string;
  amount: number;
  currency: string;
  payment_date?: Date;
  status: string;
  created_at: Date;
  updated_at: Date;
}
