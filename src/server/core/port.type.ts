import PaymentPort from "../../port/gprc/paymentPort/port";
import BalancePort from "../../port/gprc/balancePort/ports";
export default interface PortCores {
  gprc: GrpcCore;
}

export interface GrpcCore {
  paymentPort: PaymentPort;
  balancePort: BalancePort;
}
