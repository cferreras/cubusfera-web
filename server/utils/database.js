import { Sequelize } from "sequelize";

import 'dotenv/config'

const sequelize = new Sequelize(process.env.database, process.env.database_user, process.env.database_password, {
  dialect: "mysql",
  host: process.env.database_host,
  port: process.env.database_port,
  charset: "utf8mb4",
  logging: false
});

export default sequelize;

