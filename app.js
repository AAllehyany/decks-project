require('dotenv').config();
const express = require('express');
const path = require('path');
const knex = require('./database');
const app = express();
const userRoutes = require('./routes/user');
const weissTitleRoutes = require('./routes/weiss_titles');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes(express));
app.use('/weiss-titles', weissTitleRoutes(express));
app.get('/hi', async (req, res) => {

    const result = await knex.select().table('weiss_cards');
    res.status(200).json(result);
});


module.exports = app;