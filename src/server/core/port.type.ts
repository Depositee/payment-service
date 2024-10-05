import PaymentPort from "../../port/gprc/paymentPort/port";
export default interface PortCores {
    gprc:GrpcCore
}

export interface GrpcCore{
    paymentPort:PaymentPort;
}