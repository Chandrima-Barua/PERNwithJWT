export default (sequelize, Sequelize) => {
    const MusicStyle = sequelize.define("musicstyles", {
      serviceProviderID: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
      genreID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      voteID: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
      
    });
   
    return MusicStyle;
  
  };