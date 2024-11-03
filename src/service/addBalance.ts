import BalanceRepo from "../adapter/db/PostgreSQL/balance/repo";
import Balance from "../adapter/db/PostgreSQL/balance/type";

export default class AddBalanceService {
  constructor(private balanceRepo: BalanceRepo) {}
  async Handle(user_id: number, balance: number): Promise<Balance> {
    const user_balance = await this.balanceRepo.getBalanceByUserId(user_id);
    if (user_balance) {
      const new_balance = Number(user_balance.balance) + Number(balance);
      const result = await this.balanceRepo.updateBalanceByUserId(
        user_id,
        new_balance
      );
      return result;
    } else {
      const result = await this.balanceRepo.createBalance(
        user_id,
        balance,
        "THB"
      );
      return result;
    }
  }
}
