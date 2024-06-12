import * as pg from "pg";
import { Sequelize } from "sequelize";
import "dotenv/config";

const porta: number | any = process.env.DB_PORT;
const dialect: string | any = process.env.DB_DIALECT;

console.log(process.env.DB_DATABASE);

export const db = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD ,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: porta ,
    dialectModule: pg,
  }
);
