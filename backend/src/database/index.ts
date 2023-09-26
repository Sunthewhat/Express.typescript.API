import mysql from "mysql2";
import DotEnvConfig from "../configs/dotenvConfig";

DotEnvConfig();
const connection: any = mysql.createConnection({
  host: process.env.DB_HOST || "",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 13306,
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "",
});

export default connection;
