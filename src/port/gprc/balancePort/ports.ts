import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import GetBalanceByUserIdService from "../../../service/getBalanceByUserId";
import AddBalanceService from "../../../service/addBalance";
import { Balance } from "../gen/protos/payment";
import AddBalance from "./addBalance";
import { BalanceServiceService } from "../gen/protos/payment";
import Port from "../port";
export default class BalancePort extends Port {
  constructor(
    // private GetBalanceByUserIdService: GetBalanceByUserIdService,
    private AddBalanceService: AddBalanceService
  ) {
    super(BalanceServiceService);
  }
  // async GetBalanceByUserId(
  //   call: ServerUnaryCall<UserId, Balance>,
  //   callback: sendUnaryData<Balance>
  // ) {
  //   GetBalanceByUserId(this.GetBalanceByUserIdService, call, callback);
  // }
  async AddBalance(
    call: ServerUnaryCall<Balance, Balance>,
    callback: sendUnaryData<Balance>
  ) {
    AddBalance(this.AddBalanceService, call, callback);
  }
}
