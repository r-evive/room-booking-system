const promise = require('bluebird');

const initOptions = {
    promiseLib: promise
};

const pgp = require('pg-promise')(initOptions);
const config = require('./config');
const db = pgp(config.db);


module.exports = db;