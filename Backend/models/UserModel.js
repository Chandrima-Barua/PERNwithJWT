// import ServiceProvider from "./ServiceProviderModel";

export default (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    salutation: {
      type: Sequelize.STRING,
      allowNull: false
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false
    },
    birthday: {
      type: Sequelize.DATE,
      allowNull: false
    },
    // website: {
    //   type: Sequelize.STRING,
    //   allowNull: true
    // },
    role: {
      type: Sequelize.STRING,
      default: 'user',
      enum: ["user", "DL"]
     },

    refresh_token: {
      type: Sequelize.TEXT
    }
  });

  // User.hasOne(ServiceProvider);
  
  // User.associate = (models) => {
  //   User.belongsToMany(models.Service, {
  //     through: models.ServiceUser,
  //     as: 'services',
  //     foreignKey: 'userID',
  //     onDelete: 'CASCADE' 
  //   });
  // };
  return User;

};