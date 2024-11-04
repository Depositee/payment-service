import BalanceRepo from "../adapter/db/PostgreSQL/balance/repo";
import Balance from "../adapter/db/PostgreSQL/balance/type";

export default class UpdateBalanceByUserIdService {
  constructor(private balanceRepo: BalanceRepo) {}
  async Handle(userId: string, amount: number): Promise<Balance> {
    return await this.balanceRepo.updateBalanceByUserId(userId, amount);
  }
}
