export default (sequelize, Sequelize) => {
    const ServiceProvider = sequelize.define("serviceProviders", {
      groupType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      voice: {
        type: Sequelize.STRING,
        allowNull: true
      },
      numberOfmembers: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      startYear: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      isTrained: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },   
      numberOfEvents: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
      
    });
   
    return ServiceProvider;
  
  };