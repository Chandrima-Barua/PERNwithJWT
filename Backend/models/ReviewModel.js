export default  (sequelize, Sequelize) => {
    const Review =   sequelize.define("reviews", {
      desc: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    
    return Review;
  
  };