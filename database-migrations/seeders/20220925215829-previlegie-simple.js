'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('previlegies_users', [{
      description:'Usuario Comum',
      force:1
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('previlegies_users', null, {});
  }
};