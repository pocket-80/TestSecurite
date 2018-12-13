var db = require('../db');

var Produit = {
    getProduits: function (callback) {
        return db.query('SELECT * from t_matiere', callback);
    },
    createProduit: function (Produit, callback) {
        return db.query('Insert into t_matiere(libelle, coefficient) values(?, ?)', [Produit.libelle, Produit.coefficient], callback);
    },
    deleteProduit: function (Produit, callback) {
        return db.query('DELETE from t_matiere WHERE id = ?', [Produit.id], callback);
    }
}

module.exports = Produit;
