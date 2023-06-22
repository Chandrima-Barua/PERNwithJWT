export default  (sequelize, Sequelize) => {
    const Offer =   sequelize.define("offers", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    
    //seeder
    // Check that they were populated.
    Offer.sync().then(() => {
        Offer.findAndCountAll()
    .then(result => {
        
        if(result.count == 0){
            Offer.bulkCreate([
                { name: 'Nur Gesang'  },
                { name: 'Gesang mit instrumentalischer Begleitung' },
                { name: 'Gesang mit Playback' },
                { name: 'Nur instrumentalische Begleitung' },
               
              ])
        }
    })
    .catch(err => {
        throw err;
    });
});

    return Offer;
  
  };