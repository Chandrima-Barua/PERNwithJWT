export default (sequelize, Sequelize) => {
    const Booking = sequelize.define("bookings", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // specify other booking attributes here
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cancelled_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
    
    Booking.associate = function(models) {
      /*Booking.belongsTo(models.User, {
        foreignKey: 'userID',
        onDelete: 'CASCADE',
      });*/

      /*Booking.belongsToMany(models.ServiceProvider, {
        through: models.BookingServiceProvider,
        as: 'serviceProviders',
        foreignKey: 'serviceProviderID',
        onDelete: 'CASCADE'
      });*/
    };

    return Booking;
};