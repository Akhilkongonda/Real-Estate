const express = require('express');
const router = express.Router();
const { addFormdata } = require('../controllers/formcontroller');

// Route to handle form submissions
router.post('/submitform',addFormdata);

module.exports = router;
