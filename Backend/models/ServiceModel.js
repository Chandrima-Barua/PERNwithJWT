export default (sequelize, Sequelize) => {
  const Service = sequelize.define("services", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  Service.associate = (models) => {
    Service.belongsToMany(models.User, {
      through: models.ServiceUser,
      as: 'users',
      foreignKey: 'serviceID'
    });
  };
  // Service.associate = (models) => {
  //   Service.hasMany(models.Category, {
  //     through: models.ServiceCategory,
  //     as: 'categories',
  //     foreignKey: 'serviceID'
  //   });
  // };
  return Service;

};