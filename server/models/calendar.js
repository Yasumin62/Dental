'use strict';
module.exports = (sequelize, DataTypes) => {
  const Calendar = sequelize.define('Calendar', {
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    title: DataTypes.STRING,
    customer: DataTypes.STRING,
    doctor: DataTypes.STRING
  }, {});
  Calendar.associate = function(models) {
  };
  return Calendar;
};