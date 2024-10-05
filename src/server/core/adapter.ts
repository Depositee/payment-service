import PaymentRepo from "../../adapter/db/PostgreSQL/payment/repo";
import AdapterCores from "./adapter.type";
import { Pool } from "pg";

export default function InitAdapterCore(
    pool:Pool
):AdapterCores {
    return {
        db:{
            postgresql:{
                paymentRepo:new PaymentRepo(pool)
            }
        }
    }
}