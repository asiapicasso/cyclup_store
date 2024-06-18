import dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: true,
    entities: [__dirname + "/src/models/*.ts"], // Assurez-vous que les entités sont incluses
    migrations: [__dirname + "/src/migrations/*.ts"], // Inclure les migrations
    subscribers: [],
});

AppDataSource.initialize().catch((error) => console.log("Error during Data Source initialization", error));
