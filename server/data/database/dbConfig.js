require('dotenv').config({path: '../../.env'});
const knex = require('knex');
const config = require('./knexfile.js');

const dbEngine = process.env.NODE_ENV || 'dev';

module.exports = knex(config[dbEngine]);
