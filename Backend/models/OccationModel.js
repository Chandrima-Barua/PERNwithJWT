export default  (sequelize, Sequelize) => {
    const Occation =   sequelize.define("occations", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    
    //seeder
    // Check that they were populated.
    Occation.sync().then(() => {
        Occation.findAndCountAll()
    .then(result => {
        
        if(result.count == 0){
            Occation.bulkCreate([
                { name: 'Begleitung (freie Trauung)' },
                { name: 'Auftritt (Rahmenprogramm)' },
                { name: 'Begleitung (kirchliche Trauung)' },
                { name: 'Auftritt (Hochzeitstanz)' },
                { name: 'Begleitung (Standesamt)' },
                { name: 'Auftritt (Tanzen)' },
                { name: 'Hintergrundmusik (Essen, Sektempfang)' },
                { name: 'Sonstige' },
              ])
        }
    })
    .catch(err => {
        throw err;
    });
});

    return Occation;
  
  };