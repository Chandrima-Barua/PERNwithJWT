//This Models for type of instrument in Media for service provider 
export default  (sequelize, Sequelize) => {
    const MediaInstrument =   sequelize.define("mediaInstruments", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    
    //seeder
    // Check that they were populated.
    MediaInstrument.sync().then(() => {
        MediaInstrument.findAndCountAll()
    .then(result => {
        
        if(result.count == 0){
            MediaInstrument.bulkCreate([
              { name: 'Akkordeon' },
              { name: 'Cello' },
              { name: 'Gitarre' },
              { name: 'Geige' },
              { name: 'Harfe' },
              { name: 'Keyboard' },
              { name: 'Klarinette' },
              { name: 'Klavier' },
              { name: 'Kontrabass' },
              { name: 'Orgel' },
              { name: 'Percussion' },
              { name: 'Saxophon' },
              { name: 'Schlagzeug' },
              { name: 'Querflöte' },
              { name: 'Gesang' },
              { name: 'Sonstiges' } 
              ])
        }
    })
    .catch(err => {
        throw err;
    });
});

    return MediaInstrument;
  
  };