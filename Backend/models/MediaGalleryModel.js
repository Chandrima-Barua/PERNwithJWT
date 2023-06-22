//This is the model for uploading files im Gallary in service provider page with Event Type and event instrument
export default (sequelize, Sequelize) => {
    const MediaGallery = sequelize.define("mediaGalleries", {
      serviceProviderID: {
            type: Sequelize.INTEGER,
            allowNull: false
      },
      mediaID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      mediaEventID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      mediaInstrumentID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      isProfilePicture: { 
        type: Sequelize.BOOLEAN, 
        allowNull: false 

      }
      
    });
   
    return MediaGallery;
  
  };