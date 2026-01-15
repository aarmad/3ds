const marketData = require('../models/data').market;

exports.getMarket = (req, res) => {
  res.json(marketData);
};

exports.updateMarket = (req, res) => {
  // En production: ajouter authentification
  Object.assign(marketData, req.body);
  res.json({ 
    message: 'Données de marché mises à jour',
    data: marketData 
  });
};