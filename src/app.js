const express = require('express');
const app = express();
const router = require('../routes/index');
const rateLimit = require('express-rate-limit');

app.use(express.json());

//Write a rate limit middleware here with limit (within 1 min max request is 5)
//use const limiter or you have to change app.use given below

app.use('/api/v1', limiter, router);

module.exports = app;
