import PaymentRepo,{Payment as PaymentDBValue} from "../adapter/db/payment/repo";
import { Payment } from "../../protos/payment_tmp";

export default class getPaymentHistoryByUserIdHandler{
    constructor(
        private paymentRepo:PaymentRepo
    ) {}
    async Handle(userId:number):Promise<Payment[]> {
        const result = await this.paymentRepo.getPaymentHistoryByUserId(userId);
        return result;
    }
    private mapPaymentToPayment
}
// export function login(
//     call: ServerUnaryCall<UserId,PaymentList>,
//     callback: sendUnaryData<PaymentList>
//   ){
//     const requestData = call.request;
//     // const user = users.find(
//     //   (user) =>
//     //     user.username === requestData.username &&
//     //     user.password === requestData.password
//     // );
  
//     // if (user) {
//     //   const result: LoginResult = {
//     //     loginCode: LoginCode.SUCCESS,
//     //     token: "RandomSecretToken",
//     //   };
//     //   callback(null, result);
//     // } else {
//     //   const result: LoginResult = {
//     //     loginCode: LoginCode.FAIL,
//     //   };
//     //   callback(null, result);
//     // }
//   };