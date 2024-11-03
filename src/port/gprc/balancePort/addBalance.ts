import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import { Balance as BalanceProto } from "../gen/protos/payment";
import AddBalanceService from "../../../service/addBalance";
import Balance from "../../../adapter/db/PostgreSQL/balance/type";

export default async function AddBalance(
  AddBalanceService: AddBalanceService,
  call: ServerUnaryCall<BalanceProto, BalanceProto>,
  callback: sendUnaryData<BalanceProto>
) {
  const requestData = call.request;
  try {
    const result = await AddBalanceService.Handle(
      requestData.userId,
      requestData.balance
    );
    const response: BalanceProto = mapBalanceToBalanceProto(result);
    callback(null, response);
  } catch (error) {
    callback({
      code: status.INTERNAL,
      details: `Error Adding Balance for user_id ${requestData.userId} Err : ${error}`,
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
