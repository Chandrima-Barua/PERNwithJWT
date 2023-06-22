export default  (sequelize, Sequelize) => {
    const Event =   sequelize.define("events", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    
    return Event;
  
  };