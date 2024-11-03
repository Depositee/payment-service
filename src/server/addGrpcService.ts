import { Server } from "@grpc/grpc-js";
import { GrpcCore } from "./core/port.type";
export default function addPortToServer(grpcCore: GrpcCore, server: Server) {
  server.addService(grpcCore.paymentPort.getGrpcService(), {
    // TODO: Make this a method automate in grpc Port class
    getAllPaymentByUserId: grpcCore.paymentPort.GetAllPaymentByUserId.bind(
      grpcCore.paymentPort
    ),
    makePayment: grpcCore.paymentPort.MakePayment.bind(grpcCore.paymentPort),
  });
  server.addService(grpcCore.balancePort.getGrpcService(), {
    getBalanceByUserId: grpcCore.balancePort.GetBalanceByUserId.bind(
      grpcCore.balancePort
    ),
    addBalance: grpcCore.balancePort.AddBalance.bind(grpcCore.balancePort),
  });
}
