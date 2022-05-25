export default (sequelize, Sequelize) => {
    const Category = sequelize.define("categories", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      
    });
    
    // Category.associate = (models) => {
    //     Category.belongsTo(models.Service, {
    //     through: models.ServiceCategory,
    //     as: 'services',
    //     foreignKey: 'categoryID',
    //     onDelete: 'CASCADE' 
    //   });
    // };
    return Category;
  
  };