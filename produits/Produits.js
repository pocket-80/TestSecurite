var db = require('../db');

var Produits = {
    getProduits: function(callback)
    {
        return db.query('SELECT * FROM produits', callback);
    },
    createProduits: function (Produits, callback) {
        //return db.query('Insert into produits(libelle, coefficient) values(?, ?)',[Produits.libelle, Produits.coefficient], callback);
    }
}

module.exports = Produits;