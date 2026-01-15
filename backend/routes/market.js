const express = require('express');
const { getMarket, updateMarket } = require('../controllers/marketController');

const router = express.Router();

router.get('/', getMarket);
router.put('/', updateMarket);

module.exports = router;