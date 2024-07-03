import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { DataSource } from 'typeorm';


export const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: [
        "src/entities/**/*.entity{.ts,.js}",
    ],
    migrations: ["src/migrations/*{.ts,.js}"],
});
