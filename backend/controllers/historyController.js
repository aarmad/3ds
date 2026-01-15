const historyData = require('../models/data').history;

exports.getHistory = (req, res) => {
  res.json(historyData);
};

exports.updateHistory = (req, res) => {
  // En production, il faudrait une authentification
  Object.assign(historyData, req.body);
  res.json({ message: 'Histoire mise à jour' });
};