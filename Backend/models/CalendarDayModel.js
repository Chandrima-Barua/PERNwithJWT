export default (sequelize, Sequelize) => {
    const CalendarDay = sequelize.define("calendarDays", {
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true, // no status = available (would not recommend using enums here as options might change in the future)
      },
      pricePerHour: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      minimumFee: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      annotation: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });

    return CalendarDay;
};