import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import { PaymentList,UserId,Payment as PaymentProto } from "../gen/protos/payment";
import GetPaymentHistoryByUserIdService from "../../../service/getAllPaymentByUserId";
import Payment from "../../../adapter/db/PostgreSQL/payment/type";

export default async function GetAllPaymentByUserId(
    GetPaymentHistoryByUserIdService:GetPaymentHistoryByUserIdService,
    call: ServerUnaryCall<UserId,PaymentList>,
    callback: sendUnaryData<PaymentList>
  ){
    const requestData = call.request;
    try{
        const result = await GetPaymentHistoryByUserIdService.Handle(requestData.id);
        const response:PaymentList = {
            payments: result.map(mapPaymentToPaymentProto),
        }
        callback(null,response);
    }
    catch (error){
        callback({
            code: status.INTERNAL,
            details: `Error Fetching Payment History Err : ${error}`,
        });
    }
}

function mapPaymentToPaymentProto(payment:Payment):PaymentProto{
    return {
      senderId: payment.sender_id,
      receiverId: payment.reciver_id,
      amount: payment.amount,
        currency: payment.currency,
    }
  }