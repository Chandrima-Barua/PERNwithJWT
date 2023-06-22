export default  (sequelize, Sequelize) => {
    const Instrument =   sequelize.define("instruments", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    
    //seeder
    // Check that they were populated.
    Instrument.sync().then(() => {
        Instrument.findAndCountAll()
    .then(result => {
        
        if(result.count == 0){
            Instrument.bulkCreate([
              { name: 'Gitarre' },
              { name: 'Geige' },
              { name: 'Harfe' },
              { name: 'Kontrabass' },
              { name: 'Saxophon' },
              { name: 'Trompete' },
              { name: 'Klarinette' },
              { name: 'Schlagzeug' },
              { name: 'Keyboard' },
              { name: 'Dudelsack' },
              { name: 'Percussion' },
              { name: 'Orgel' },
              { name: 'Klavier' },
              { name: 'Akkordeon' },
              { name: 'Posaune' },
              { name: 'Cello' },

             
              ])
        }
    })
    .catch(err => {
        throw err;
    });
});

    return Instrument;
  
  };