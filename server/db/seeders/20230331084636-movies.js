'use strict';
const axios = require('axios');
const fs = require('fs/promises');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const result = JSON.parse(await fs.readFile('./data.txt', 'utf8'));
    await queryInterface.bulkInsert(
      'Movies',
      result.map(el => ({
        api_id: el.id,
        title: el.title,
        info: el.overview,
        date: el.release_date,
        rate: el.vote_average,
        img: el.poster_path,
      })),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Movie', null, {});
  },
};
