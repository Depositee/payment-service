

export default class Config{
  serverConfig: ServerConfig;
  databaseConfig: DataBaseConfig;
  constructor(
    serverConfig: ServerConfig, 
    databaseConfig: DataBaseConfig
  ){
    this.serverConfig = serverConfig;
    this.databaseConfig = databaseConfig;
  }

  getHostUrl():string{
    return `http://${this.serverConfig.host}:${this.serverConfig.post}`;
  }
}

interface ServerConfig{
  host: string;
  post: number;
}

interface DataBaseConfig{
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}