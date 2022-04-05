import {Sequelize} from "sequelize";

// const dbConfig = new Sequelize('pypdb','postgres','root',{
//     host: "localhost",
//     dialect: "postgres",
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//       }
// });

// export default dbConfig;

const dbConfig = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "root",
  DB: "pypdb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
export default dbConfig;