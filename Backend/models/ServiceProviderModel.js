export default (sequelize, Sequelize) => {
    const ServiceProvider = sequelize.define("serviceProviders", {
      people: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      experience: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      stage_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      
      gender: {
        type: Sequelize.STRING,
        allowNull: false
      },
      short_description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      detailed_description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      reference: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      embedded_link: {
        type: Sequelize.STRING,
        allowNull: true
      }
      
    });
     
    return ServiceProvider;
  
  };