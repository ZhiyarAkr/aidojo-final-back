import { DataSource } from "typeorm";
import User from "../entity/User";
import Text from "../entity/Text";
import dotenv from "dotenv";

dotenv.config();
const DbName = process.env.DB_NAME;
const DbUsername = process.env.DB_USERNAME;
const DbPassword = process.env.DB_PASSWORD;

const chatDataSource = new DataSource({
  host: "localhost",
  type: "postgres",
  port: 5432,
  database: DbName,
  username: DbUsername,
  password: DbPassword,
  entities: [User, Text],
  synchronize: true,
});

export default chatDataSource;
