import GetBalanceByUserIdService from "../../../service/getBalanceByUserId";
import { Balance as BalanceProto, UserId } from "../gen/protos/payment";
import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import Balance from "../../../adapter/db/PostgreSQL/balance/type";

export default async function GetBalanceByUserId(
  GetBalanceByUserIdService: GetBalanceByUserIdService,
  call: ServerUnaryCall<UserId, BalanceProto>,
  callback: sendUnaryData<BalanceProto>
) {
  const requestData = call.request;
  try {
    const result = await GetBalanceByUserIdService.Handle(requestData.id);
    const response: BalanceProto = mapBalanceToBalanceProto(result);
    callback(null, response);
  } catch (error) {
    callback({
      code: status.INTERNAL,
      details: `Error get Balance for user_id ${requestData.id} Err : ${error}`,
    });
  }
}

function mapBalanceToBalanceProto(balance: Balance): BalanceProto {
  return {
    userId: balance.user_id,
    balance: balance.balance,
    currency: balance.currency,
  };
}
