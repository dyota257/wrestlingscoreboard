// Pick which DB to use here. 'maria' is local on Blackbox600, 'jaws' is online at Heroku.


const jaws = require('../database/jaws.js');
const maria = require('../database/maria.js');

const db = () => {return jaws()}

module.exports = db;