export default (sequelize, Sequelize) => {
    const EventType = sequelize.define("eventTypes", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

   //seeder
    // Check that they were populated.
    EventType.sync().then(() => {
      EventType.findAndCountAll()
  .then(result => {
      
      if(result.count == 0){
        EventType.bulkCreate([
              { name: 'Hochzeit' },
              { name: 'Goldene Hochzeit' },
              { name: 'Silberne Hochzeit' },
              { name: 'Taufe' },
              { name: 'Betriebsfeier' },
              { name: 'Polterabend' },
              { name: 'Gastronomie Event' },
              { name: 'Trauerfeier' },
              { name: 'Abiball / Schulabschluss' },
              { name: 'Vereinsfest' },
              { name: 'Gartenfeier' },
              { name: 'Trauungs-Zeremonie' },
              { name: 'Weihnachtsfeier' },
              { name: 'Karneval' },
              { name: 'Konzert' },
              { name: 'Silvesterfeier' },
              { name: 'Club / Disco' },
              { name: 'Oktoberfest' },
              { name: 'Festival' },
              { name: 'Politisches Event' },
              { name: 'Religiöses Event' },
              { name: 'Kinderfeier' },
              { name: 'Private Feier' },
              { name: 'Einweihungsfeier' },
              { name: 'Motto Party' },
              { name: 'Seniorenfeier' },
              { name: 'Studentenfeier' },
              { name: 'Sonstige' },
              { name: 'Messe' },
              { name: 'Geburtstag' },
            ])
      }
  })
  .catch(err => {
      throw err;
  });
});
    
    return EventType;
  
  };