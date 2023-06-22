import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const dbConfig = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
});

// const dbconfig = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.HOST,
//   dialect: 'postgres',
//   operatorsAliases: 0,
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// });

export default dbConfig;






