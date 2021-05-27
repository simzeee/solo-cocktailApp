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
        {
          name: 'Martini',
          description: 'Stronger than you think.',
          imageUrl:
            'https://www.liquor.com/thmb/Tg83gGIz-cS8nO-aAHa2N6R4eFQ=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/dry-martini-720x720-primary-a6de08f8cd584ad88520287922578bcb.jpg',
          userId: 1,
          commentId: 1,
          classic: true,
        },
        {
          name: 'Old Fashioned',
          description: 'Classic and delicious',
          imageUrl:
            'https://images.absolutdrinks.com/drink-images/Raw/Absolut/01723f0d-1c38-4955-b75d-c9b822a20c7a.jpg?imwidth=500',
          userId: 1,
          commentId: 1,
          classic: true,
        },
        {
          name: 'Martinez',
          description: 'Boozy.',
          imageUrl:
            'https://www.acouplecooks.com/wp-content/uploads/2020/05/Martinez-Cocktail-021.jpg',
          userId: 1,
          commentId: 1,
          classic: true,
        },
        {
          name: 'Whiskey Sour',
          description: 'Foamy, frothy, good',
          imageUrl:
            'https://www.acouplecooks.com/wp-content/uploads/2020/05/Martinez-Cocktail-021.jpg',
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
