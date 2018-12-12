var express = require('express');
var app = express();

var ProduitsController = require('./produits/ProduitsController');
app.use('/produits', ProduitsController);

module.exports = app;