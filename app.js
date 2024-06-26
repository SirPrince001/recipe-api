
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index')
//require('../BACKEND-API/database/db').connectDB();


const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json())
app.use(routes)



module.exports = app;