export default  (sequelize, Sequelize) => {
    const Vote =   sequelize.define("votes", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      point: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
    
    //seeder
    // Check that they were populated.
    Vote.sync().then(() => {
        Vote.findAndCountAll()
    .then(result => {
        
        if(result.count == 0){
            Vote.bulkCreate([
                { name: 'gar nicht' , point: 0},
                { name: 'wenig', point: 1},
                { name: 'mittel', point: 2 },
                { name: 'viel', point: 3 },
                { name: 'sehr viel', point: 4 },
                
              ])
        }
    })
    .catch(err => {
        throw err;
    });
});

    return Vote;
  
  };