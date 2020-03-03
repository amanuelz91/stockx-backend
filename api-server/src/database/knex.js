require('dotenv').config()
var environment = process.env.NODE_ENV || 'development';
var config = require('../../knexfile.js')[environment];
const logger = require('pino')()
logger.info('process env node = ',process.env.NODE_ENV)

module.exports = require('knex')(config);
