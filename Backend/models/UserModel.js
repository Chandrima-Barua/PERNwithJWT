export default (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        salutation: {
          type: Sequelize.STRING,
          allowNull: false 
        },
        first_name: {
          type: Sequelize.STRING,
          allowNull: false 
        },
        last_name: {
          type: Sequelize.STRING,
          allowNull: false 
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false 
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false 
        },
        phoneNumber: {
          type: Sequelize.STRING,
          allowNull: false 
        },
        birthday: {
          type: Sequelize.DATE,
          allowNull: false 
        },
        website: {
          type: Sequelize.STRING,
          allowNull: true 
        },
        service:{
          type: Sequelize.STRING,
          allowNull: false 
        } ,
        refresh_token:{
            type: Sequelize.TEXT
        }
    });
      return User;
     
};