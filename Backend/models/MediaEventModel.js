//This model is for the type of event in media uploading page for service provider
export default  (sequelize, Sequelize) => {
    const MediaEvent =   sequelize.define("mediaEvents", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    
    //seeder
    // Check that they were populated.
    MediaEvent.sync().then(() => {
        MediaEvent.findAndCountAll()
    .then(result => {
        
        if(result.count == 0){
            MediaEvent.bulkCreate([                   
              { name: 'Vorstellungsvideo' },
              { name: 'Allgemein - Eventübergreifend' },
              { name: 'Hochzeit' },
              { name: 'Geburtstag' },
              { name: 'Betriebsfeier' },
              { name: 'Weihnachtsfeier' },
              { name: 'Abiball / Schulabschluss' },
              { name: 'Goldene Hochzeit' },
              { name: 'Silberne Hochzeit' },
              { name: 'Polterabend' },
              { name: 'Club / Disco' },
              { name: 'Vereinsfest' },
              { name: 'Karneval' },
              { name: 'Oktoberfest' },
              { name: 'Messe' },
              { name: 'Motto Party' },
              { name: 'Kinderfeier' },
              { name: 'Seniorenfeier' },
              { name: 'Gastronomie Event' },
              { name: 'Gartenfeier' },
              { name: 'Konzert' },
              { name: 'Festival' },
              { name: 'Private Feie' },
              { name: 'Taufe' },
              { name: 'Trauerfeier' },
              { name: 'Trauungs-Zeremonie' },
              { name: 'Silvesterfeier' },
              { name: 'Politisches Event' },
              { name: 'Einweihungsfeier' },
              { name: 'Religiöses Event' },
              { name: 'Studentenfeier' },
              { name: 'Sonstige' },
              ])
        }
    })
    .catch(err => {
        throw err;
    });
});

    return MediaEvent;
  
  };