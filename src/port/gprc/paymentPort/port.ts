import Port from "../port";
import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { PaymentList,UserId} from "../gen/protos/payment";
import { PaymentServiceService } from "../gen/protos/payment";
import GetPaymentHistoryByUserIdService from "../../../service/getAllPaymentByUserId";
import GetAllPaymentByUserId from "./getAllPaymentByUserId";

export default class PaymentPort extends Port{
    constructor(
        private GetPaymentHistoryByUserIdService:GetPaymentHistoryByUserIdService
    ) {
      super(PaymentServiceService);
    }
    async GetAllPaymentByUserId(
      call: ServerUnaryCall<UserId,PaymentList>,
      callback: sendUnaryData<PaymentList>
    ){
      GetAllPaymentByUserId(
        this.GetPaymentHistoryByUserIdService,
        call,
        callback
      )
    }
}
    
