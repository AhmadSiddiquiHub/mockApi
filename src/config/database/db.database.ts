import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'postgres',
  entities: [join(__dirname, '../../entities', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '../../', 'migrations', '*.{ts,js}')],
  synchronize: false
};

export default config;
