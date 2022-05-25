export default (sequelize, Sequelize) => {

    const ServiceUser = sequelize.define('service_user', {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        serviceId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {});
    ServiceUser.associate = (models) => {
        // associations can be defined here
    };
    return ServiceUser;


};