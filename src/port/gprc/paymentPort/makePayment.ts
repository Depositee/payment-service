import Payment from "../../../adapter/db/PostgreSQL/payment/type";
import MakePaymentService from "../../../service/makePayment";
import convertPgTimestampToDate from "../../../utils/convertPGTimeStamp2DateTIme";
import {
  Payment as PaymentProto,
  PaymentResponse,
} from "../gen/protos/payment";
import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";

export default async function MakePayment(
  MakePaymentService: MakePaymentService,
  call: ServerUnaryCall<PaymentProto, PaymentResponse>,
  callback: sendUnaryData<PaymentResponse>
) {
  const requestData = call.request;
  try {
    const result = await MakePaymentService.Handle(
      requestData.senderId,
      requestData.receiverId,
      requestData.amount
    );
    const response = mapPaymentToPaymentResponse(result);
    callback(null, response);
  } catch (error) {
    callback({
      code: status.INTERNAL,
      details: `Error MakePayment Err : ${error}`,
    });
  }
}

function mapPaymentToPaymentResponse(payment: Payment): PaymentResponse {
  return {
    id: payment.id,
    senderId: payment.sender_id,
    receiverId: payment.reciver_id,
    amount: payment.amount,
    currency: payment.currency,
    createdAt: payment.created_at,
    updatedAt: payment.updated_at,
  };
}
