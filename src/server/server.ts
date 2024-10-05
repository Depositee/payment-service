import {
    Server,
    ServerCredentials,
  } from "@grpc/grpc-js";
import InitCores from "./cores";

const {config} = InitCores();

const server = new Server();
const getHostUrl = config.getHostUrl();
server.bindAsync(getHostUrl, ServerCredentials.createInsecure(), () => {
  console.log(`Server running at ${getHostUrl}`);
});