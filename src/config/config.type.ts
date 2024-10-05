

export default class Config{
  constructor(
    public serverConfig: ServerConfig, 
    public databaseConfig: DataBaseConfig
  ){
  }

  getHostUrl():string{
    return `${this.serverConfig.host}:${this.serverConfig.port}`;
  }
}

interface ServerConfig{
  host: string;
  port: number;
}

interface DataBaseConfig{
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}