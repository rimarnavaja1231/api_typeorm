import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { AppDataSource } from "../data-source";

dotenv.config();

export class DbHelper {
  static async initialize(): Promise<void> {
    await DbHelper.createDatabaseIfNotExists();
    await DbHelper.connectTypeORM();
  }

  private static async createDatabaseIfNotExists(): Promise<void> {
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

    try {
      // Create database connection without specifying a database
      const connection = await mysql.createConnection({
        host: DB_HOST || "localhost",
        port: Number(DB_PORT) || 3306,
        user: DB_USER || "root",
        password: DB_PASSWORD || "1010",
      });

      // Create database if it doesn't exist
      await connection.query(
        `CREATE DATABASE IF NOT EXISTS \`${DB_NAME || "nmcapi"}\`;`
      );

      // Close connection
      await connection.end();

      console.log(`Database '${DB_NAME}' is ready.`);
    } catch (error) {
      console.error("Error initializing database:", error);
      throw error;
    }
  }

  private static async connectTypeORM(): Promise<void> {
    try {
      await AppDataSource.initialize();
      console.log("TypeORM Data Source has been initialized!");
    } catch (error) {
      console.error("Error during TypeORM initialization:", error);
      throw error;
    }
  }
}
