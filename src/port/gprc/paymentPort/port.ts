import Port from "../port";
import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import {
  PaymentList,
  UserId,
  Payment,
  PaymentResponse,
  PaymentServiceService,
} from "../gen/protos/payment";
import MakePayment from "./makePayment";
import MakePaymentService from "../../../service/makePayment";
import GetPaymentHistoryByUserIdService from "../../../service/getAllPaymentByUserId";
import GetAllPaymentByUserId from "./getAllPaymentByUserId";

export default class PaymentPort extends Port {
  constructor(
    private GetPaymentHistoryByUserIdService: GetPaymentHistoryByUserIdService,
    private MakePaymentService: MakePaymentService
  ) {
    super(PaymentServiceService);
  }
  async GetAllPaymentByUserId(
    call: ServerUnaryCall<UserId, PaymentList>,
    callback: sendUnaryData<PaymentList>
  ) {
    GetAllPaymentByUserId(
      this.GetPaymentHistoryByUserIdService,
      call,
      callback
    );
  }
  async MakePayment(
    call: ServerUnaryCall<Payment, PaymentResponse>,
    callback: sendUnaryData<PaymentResponse>
  ) {
    MakePayment(this.MakePaymentService, call, callback);
  }
}
