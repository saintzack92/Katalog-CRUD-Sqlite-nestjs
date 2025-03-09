import "reflect-metadata";
import { DataSource } from "typeorm";
import { join } from "path";
import entities from "./typeorm"; // Ensure this imports all your entities

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: join(process.cwd(), "database.sqlite"),
  entities: entities,
  synchronize: false, // Use migrations instead of auto-sync
  migrations: ["src/migrations/*.ts"], // Ensure migrations are inside "src/migrations/"
});
