import ServiceCores from "./service.type";
import PortCores from "./port.type";
import PaymentPort from "../../port/gprc/paymentPort/port";
export default function InitPortCore(
    serviceCores: ServiceCores
): PortCores{
    return {
        gprc:{
            paymentPort: new PaymentPort(serviceCores.getPaymentHistoryByUserIdService)
        }
    }
}