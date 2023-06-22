export default (sequelize, Sequelize) => {
  const BookingServiceProvider = sequelize.define('bookingServiceProviders', {
      price: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
  });

  BookingServiceProvider.associate = function(models) {
    BookingServiceProvider.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    BookingServiceProvider.belongsTo(models.ServiceProvider, {
      foreignKey: 'serviceProviderId',
      as: 'serviceProvider',
    })
  }

  return BookingServiceProvider;
};