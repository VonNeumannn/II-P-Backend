const express = require('express')
const controller = require('./database/controller');
const router = express.Router()
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express()
const port = 8080
/*
Configurations for JSON
*/ 
app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
/*
Call functions
*/
app.post('/byAmount', controller.filterByAmount)
app.post('/byArticle', controller.filterByArticleType)
app.post('/byName', controller.filterByName)
app.post('/insert', controller.insertArticle)
app.post('/login', controller.login)
app.use('/',router)
/*
Shut up server
*/
app.listen(port, () => {
    console.log("Online")
})