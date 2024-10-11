import BalanceRepo from "../adapter/db/PostgreSQL/balance/repo";
import Balance from "../adapter/db/PostgreSQL/balance/type";

export default class GetBalanceByUserIdService{
    constructor(
        private balanceRepo:BalanceRepo
    ) {}
    async Handle(userId:number):Promise<Balance> {
        return await this.balanceRepo.getBalanceByUserId(userId);
    }
}