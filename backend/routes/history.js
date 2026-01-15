const express = require('express');
const { getHistory, updateHistory } = require('../controllers/historyController');

const router = express.Router();

router.get('/', getHistory);
router.put('/', updateHistory); // Route admin pour modifier

module.exports = router;