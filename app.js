require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(require('./routes'))

app.listen(port, () => console.log(`Listening on port ${port}`))

module.exports = app;