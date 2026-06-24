const express = require('express');
const router = express.Router();

const klantController = require('../controllers/klantController');

router.post('/klanten', klantController.maakKlant);
router.get('/klanten', klantController.alleKlanten);

module.exports = router;