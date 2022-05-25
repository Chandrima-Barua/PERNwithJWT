import dbConfig from "../config/Database.js";
import { Sequelize } from "sequelize";
import User from "./UserModel.js";
import Service from "./ServiceModel.js";
import Category from "./CategoryModel.js";
import ServiceUser from "./ServiceUser.js";
import ServiceProvider from "./ServiceProviderModel.js";
import Media from "./MediaModel.js";


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = User(sequelize, Sequelize);
db.services = Service(sequelize, Sequelize);
db.service_user = ServiceUser(sequelize, Sequelize);
db.categories = Category(sequelize, Sequelize);
db.serviceProvider = ServiceProvider(sequelize, Sequelize);
db.media = Media(sequelize, Sequelize);

// category to service one to many relationship
db.services.hasMany(db.categories, { as: "categories" });
db.categories.belongsTo(db.services, {
  foreignKey: "serviceID",
  as: "services",
});

// user to service provider one to many relationship
db.users.hasMany(db.serviceProvider, { as: "serviceProviders" });
db.serviceProvider.belongsTo(db.users, {
  foreignKey: "userID",
  // as: "users",
});

// user to media one to many relationship
db.users.hasMany(db.media, { as: "medias" });
db.media.belongsTo(db.users, {
  foreignKey: "userID",
  // as: "users",
});
export default db;
