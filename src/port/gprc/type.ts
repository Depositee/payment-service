import { PaymentServiceService } from "./gen/protos/payment";
import { BalanceServiceService } from "./gen/protos/payment";
type GrpcService = PaymentServiceService | BalanceServiceService;
export default GrpcService;
