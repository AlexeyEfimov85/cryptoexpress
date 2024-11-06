import { DataSource } from "typeorm";
import 'dotenv/config';
import process from 'process';
import path from "path";

export const myDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(String(process.env.POSTGRES_PORT)) || 5432,
    username: process.env.POSTGRES_USER || 'student',
    password: process.env.POSTGRES_PASSWORD || 'student',
    database: process.env.POSTGRES_DB || 'nest_project',
    entities: [path.join(__dirname, 'entity/*.*')],
    logging: true,
    synchronize: true,
})
