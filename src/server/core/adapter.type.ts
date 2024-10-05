import PaymentRepo from "../../adapter/db/PostgreSQL/payment/repo";

export default interface AdapterCores {
    db:dbCore;
}

interface dbCore{
    postgresql:postgresqlCore;
}

interface postgresqlCore{
    paymentRepo:PaymentRepo;
}