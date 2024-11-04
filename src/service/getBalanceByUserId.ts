import BalanceRepo from "../adapter/db/PostgreSQL/balance/repo";
import Balance from "../adapter/db/PostgreSQL/balance/type";

export default class GetBalanceByUserIdService {
  constructor(private balanceRepo: BalanceRepo) {}
  async Handle(userId: string): Promise<Balance> {
    try {
      let result = await this.balanceRepo.getBalanceByUserId(userId);
      if (!result) {
        result = await this.balanceRepo.createBalance(userId, 0, "THB");
      }
      return result;
    } catch (error) {
      throw new Error(`Error get Balance for user_id ${userId} Err : ${error}`);
    }
  }
}
