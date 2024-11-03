import ServiceCores from "./service.type";
import PortCores from "./port.type";
import PaymentPort from "../../port/gprc/paymentPort/port";
import BalancePort from "../../port/gprc/balancePort/ports";
export default function InitPortCore(serviceCores: ServiceCores): PortCores {
  return {
    gprc: {
      paymentPort: new PaymentPort(
        serviceCores.getPaymentHistoryByUserIdService,
        serviceCores.makePaymentService
      ),
      balancePort: new BalancePort(
        serviceCores.getBalanceByUserIdService,
        serviceCores.addBalanceService
      ),
    },
  };
}
