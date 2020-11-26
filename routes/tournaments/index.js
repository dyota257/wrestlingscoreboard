/*

/routes/tournaments/index.js

*/



const history = require('../routes/tournaments/history.js');

const TournamentRouter = require('express').Router();

TournamentRouter.route('/history')
    .get(history)

module.exports = TournamentRouter;