export default (sequelize, Sequelize) => {
    const Media = sequelize.define("medias", {
      image_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
     
      
    });
     
    return Media;
  
  };