import GetBalanceByUserIdService from "../../../service/getBalanceByUserId";
export default class BalancePort extends Port{
    constructor(
        private GetBalanceByUserIdService:GetBalanceByUserIdService,
        private UpdateBalanceByUserIdService:UpdateBalanceByUserIdService
    ) {
      super(BalanceServiceService);
    }
    async GetBalanceByUserId(
      call: ServerUnaryCall<UserId,Balance>,
      callback: sendUnaryData<Balance>
    ){
      GetBalanceByUserId(
        this.GetBalanceByUserIdService,
        call,
        callback
      )
    }
    async UpdateBalanceByUserId(
      call: ServerUnaryCall<Balance,Empty>,
      callback: sendUnaryData<Empty>
    ){
      UpdateBalanceByUserId(
        this.UpdateBalanceByUserIdService,
        call,
        callback
      )
    }
}