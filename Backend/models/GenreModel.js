export default  (sequelize, Sequelize) => {
    const Genre =   sequelize.define("genres", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      desc: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
    
    //seeder
    // Check that they were populated.
    Genre.sync().then(() => {
        Genre.findAndCountAll()
    .then(result => {
        
        if(result.count == 0){
            Genre.bulkCreate([
                { name: 'Charts & Pop', desc: 'The Weeknd, Billie Eilish, Dua Lipa, Adele, Ed Sheeran, Bruno Mars...' },
                { name: 'Oldies', desc: 'Bee Gees, Boney M, ABBA, Elvis Presley, Nena, Falco...'},
                { name: 'Jazz', desc: 'Frank Sinatra, Louis Armstrong, Michael Boublé, Nat King Cole..' },
                { name: 'Schlager & Volkslieder' , desc: 'Helene Fischer, Andrea Berg, Andreas Gabalier, Vicky Leandros'},
                { name: 'Rock & Alternative', desc: 'Bon Jovi, Bryan Adams, Queen, Linkin Park, Westernhagen, Toten Hosen...' },
                { name: 'Latin & Reggaeton' , desc: 'Enrique Iglesias, Shakira, Bob Marley, Gentlemen, Ricky Martin...'},
                { name: 'RnB & HipHop',desc: 'Rihanna, Beyoncé, Ne-Yo, Post Malone, Jay Z, Marteria, Bausa...' },
                { name: 'Religiöse Lieder' }
              ])
        }
    })
    .catch(err => {
        throw err;
    });
});

    return Genre;
  
  };