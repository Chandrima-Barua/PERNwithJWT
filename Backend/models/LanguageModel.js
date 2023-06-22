export default  (sequelize, Sequelize) => {
    const Language =   sequelize.define("languages", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    
    //seeder
    // Check that they were populated.
    Language.sync().then(() => {
        Language.findAndCountAll()
    .then(result => {
        
        if(result.count == 0){
            Language.bulkCreate([
              { name: 'Deutsch' },
              { name: 'Russisch' },
              { name: 'Griechisch' },
              { name: 'Bosnisch' },
              { name: 'Italienisch' },
              { name: 'Portugiesisch' },
              { name: 'Norwegisch' },
              { name: 'Englisch' },
              { name: 'Französisch' },
              { name: 'Arabisch' },
              { name: 'Kroatisch' },
              { name: 'Niederländisch' },
              { name: 'Rumänisch' },
              { name: 'Bengalisch' },
              { name: 'Türkisch' },
              { name: 'Dänisch' },
              { name: 'Persisch' },
              { name: 'Tschechisch' },
              { name: 'Ungarisch' },
              { name: 'Serbisch' },
              { name: 'Hindi' },
              { name: 'Polnisch' },
              { name: 'Mandarin' },
              { name: 'Japanisch' },
              { name: 'Thailändisch' },
              { name: 'Vietnamesisch' },
              { name: 'Schwedisch' },
              { name: 'Urdu' }

             
              ])
        }
    })
    .catch(err => {
        throw err;
    });
});

    return Language;
  
  };