const successData = require('../models/data').success;

exports.getSuccess = (req, res) => {
  res.json(successData);
};

exports.updateSuccess = (req, res) => {
  // En production: ajouter authentification
  Object.assign(successData, req.body);
  res.json({ 
    message: 'Données de succès mises à jour',
    data: successData 
  });
};