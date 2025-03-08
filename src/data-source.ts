import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "./users/entity/user.entity";

// Load environment variables
dotenv.config();

// Initialize TypeORM AppDataSource
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "1010",
  database: process.env.DB_NAME || "nmcapi",
  synchronize: true, 
  logging: process.env.NODE_ENV === "development",
  entities: [User],
  subscribers: [],
  migrations: [],
});
