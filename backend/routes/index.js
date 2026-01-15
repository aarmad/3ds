const express = require('express');
const historyRouter = require('./history');
const successRouter = require('./success');
const marketRouter = require('./market');

const router = express.Router();

router.use('/history', historyRouter);
router.use('/success', successRouter);
router.use('/market', marketRouter);

// router.get('/admin/status', (req, res) => {
//   res.json({
//     status: 'OK',
//     message: 'API Nintendo 3DS en ligne',
//     version: '1.0.0',
//     timestamp: new Date().toISOString(),
//     sections: ['history', 'success', 'market']
//   });
// });

module.exports = router;