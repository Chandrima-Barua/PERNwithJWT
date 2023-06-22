export default  (sequelize, Sequelize) => {
    const ClothingStyle =   sequelize.define("clothingStyles", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    
    //seeder
    // Check that they were populated.
    ClothingStyle.sync().then(() => {
        ClothingStyle.findAndCountAll()
    .then(result => {
        
        if(result.count == 0){
            ClothingStyle.bulkCreate([
                { name: 'wie gewünscht' },
                { name: 'festlich' },
                { name: 'verkleidet' },
                { name: 'festlich' },
                { name: 'casual' },
              ])
        }
    })
    .catch(err => {
        throw err;
    });
});

    return ClothingStyle;
  
  };