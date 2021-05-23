'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cocktail = sequelize.define(
    'Cocktail',
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      commentId: DataTypes.STRING,
      classic: DataTypes.BOOLEAN,
    },
    {}
  );
  Cocktail.associate = function (models) {
    // associations can be defined here
    Cocktail.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Cocktail;
};
