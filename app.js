require('dotenv').config();
const express = require('express');
const path = require('path');
const knex = require('./database');
const app = express();
const userRoutes = require('./routes/user');

app.use(express.json());

app.use('/users', userRoutes(express));
app.get('/hi', async (req, res) => {

    const result = await knex.select().table('weiss_cards');
    res.status(200).json(result);
});


module.exports = app;