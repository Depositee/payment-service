import {
    Server,
    ServerCredentials
  } from "@grpc/grpc-js";
import InitCores from "./core/cores";
import addPortToServer from "./addGrpcService";

export default function startServer():void {
  const {
    config,
    portCore
  } = InitCores();
  const server = new Server();
  addPortToServer(portCore.gprc, server);
  const hostUrl = config.getHostUrl();
  server.bindAsync(hostUrl, ServerCredentials.createInsecure(), () => {
    console.log(`Server running at http://${hostUrl}`);
  });
}
