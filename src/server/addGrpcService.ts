import {
    Server,
  } from "@grpc/grpc-js";
import { GrpcCore } from "./core/port.type";
export default function addPortToServer(grpcCore: GrpcCore, server: Server) {
    server.addService(grpcCore.paymentPort.getGrpcService(), {
        // TODO: Make this a method automate in grpc Port class
        getAllPaymentByUserId: grpcCore.paymentPort.GetAllPaymentByUserId.bind(grpcCore.paymentPort),
    });
  }