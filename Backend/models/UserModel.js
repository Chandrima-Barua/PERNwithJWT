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
    website: {
      type: Sequelize.STRING,
      allowNull: true
    },

    refresh_token: {
      type: Sequelize.TEXT
    }
  });
  
  User.associate = (models) => {
    User.belongsToMany(models.Service, {
      through: models.ServiceUser,
      as: 'services',
      foreignKey: 'userID',
      onDelete: 'CASCADE' 
    });
  };
  return User;

};