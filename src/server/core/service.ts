import AdapterCores from "./adapter.type";
import ServiceCores from "./service.type";
import GetPaymentHistoryByUserIdService from "../../service/getAllPaymentByUserId";
export default function initServiceCore(
    adapterCores: AdapterCores
):ServiceCores {
    return {
        getPaymentHistoryByUserIdService:new GetPaymentHistoryByUserIdService(adapterCores.db.postgresql.paymentRepo)
    }
};