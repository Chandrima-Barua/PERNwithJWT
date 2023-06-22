export default (sequelize, Sequelize) => {
    const Pricing = sequelize.define("pricings", {
      // if weekday is "0", the pricing is the default fallback pricing for the specific service provider
      weekday: {
        type: Sequelize.INTEGER,
        allowNull: false,
        enum: [0, 1, 2, 3, 4, 5, 6, 7],
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true, // no status = available (would not recommend using enums here as options might change in the future)
      },
      pricePerHour: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      minimumFee: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
    
    Pricing.associate = function(models) {
      /*Pricing.belongsTo(models.ServiceProvider, {
        foreignKey: 'serviceProviderID',
        onDelete: 'CASCADE',
      });*/
    };

    return Pricing;
};