import {existsSync,readFileSync} from 'fs';
import Config from './config.model';

export default function getConfig():Config{
    const LOCAL_CONFIG_FILE_PATH = '../../config/config.local.json';
    const DEFAULT_CONFIG_FILE_PATH = '../../config/config.json';
  
    if (existsSync(LOCAL_CONFIG_FILE_PATH)) {
      return readConfigFile(LOCAL_CONFIG_FILE_PATH);
    } else {
      return readConfigFile(DEFAULT_CONFIG_FILE_PATH);
    }
  };


function readConfigFile(path: string): Config{
  const rawData = readFileSync(path, 'utf8');
  const configJson = JSON.parse(rawData);
  return new Config(
    configJson.serverConfig, 
    configJson.databaseConfig
);
};

