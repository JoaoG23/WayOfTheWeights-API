import { Sequelize } from "sequelize";
import 'dotenv/config';

// export const db = new Sequelize('test_db_wayoftheweights', 'postgres', 'admin', {
//   dialect: 'postgres',
//   host: 'localhost',
//   port: 5432,
// });
const porta:number | any = process.env.DB_PORT;
export const db = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
  dialect: 'postgres',
  host:process.env.DB_HOST,
  port: porta
});