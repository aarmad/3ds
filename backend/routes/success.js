const express = require('express');
const { getSuccess, updateSuccess } = require('../controllers/successController');

const router = express.Router();

router.get('/', getSuccess);
router.put('/', updateSuccess);

module.exports = router;