const express = require('express');
const Router = express.Router();
const authRoute = require('./auth');
const newsRoute = require('./news');

Router.use('/auth',authRoute);
Router.use('/news',newsRoute);

module.exports = Router;