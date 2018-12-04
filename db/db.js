const knex = require('knex');
const config = require('../config');

const db = knex(config.dbConnection);

module.exports = db;
