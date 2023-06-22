export default (sequelize, Sequelize) => {

  //This model only for uploading files for customer and service provider
    const Media = sequelize.define("medias", {
      filename: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      mimetype: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      path: { 
        type: Sequelize.STRING, 
        allowNull: false 
      }
       
    });
    // Media.associate = function(models) {
    //   Media.belongsTo(models.User, {
    //     foreignKey: 'userId',
    //     as: 'user',
    //   });
    // }
     
    return Media;
  
  };