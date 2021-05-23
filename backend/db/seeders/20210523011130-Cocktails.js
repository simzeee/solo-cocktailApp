'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Cocktails',
      [
        {
          name: 'Manhattan',
          description: 'A delicious, classic cocktail',
          imageUrl:
            'https://cdn.diffords.com/contrib/stock-images/2018/05/5af310cf41d6e.jpg',
          userId: 1,
          commentId: 1,
          classic: true,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cocktails');
  },
};
