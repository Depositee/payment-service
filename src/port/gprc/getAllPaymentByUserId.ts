import {
    ServerUnaryCall,
    sendUnaryData,
  } from "@grpc/grpc-js";
import { 
    UserId,
    PaymentList 
} from "../../../protos/payment_tmp";
export function getAllPaymentByUserId(
    call: ServerUnaryCall<UserId,PaymentList>,
    callback: sendUnaryData<PaymentList>
  ){
    const requestData = call.request;
    // const user = users.find(
    //   (user) =>
    //     user.username === requestData.username &&
    //     user.password === requestData.password
    // );
  
    // if (user) {
    //   const result: LoginResult = {
    //     loginCode: LoginCode.SUCCESS,
    //     token: "RandomSecretToken",
    //   };
    //   callback(null, result);
    // } else {
    //   const result: LoginResult = {
    //     loginCode: LoginCode.FAIL,
    //   };
    //   callback(null, result);
    // }
  };