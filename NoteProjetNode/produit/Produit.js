var db = require('../db');

var Produit = {
    getProduits: function (callback) {
        return db.query('SELECT * from produits', callback);
    },
    createProduit: function (Produit, callback) {
        return db.query('Insert into produits(nomProduit, descriptionProduit) values(?, ?)', [Produit.nomProduit, Produit.descriptionProduit], callback);
    },
    deleteProduit: function (Produit, callback) {
        return db.query('DELETE from produits WHERE idProduit = ?', [Produit.id], callback);
    }
}

module.exports = Produit;
