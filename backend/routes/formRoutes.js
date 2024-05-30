const express = require('express');
const router = express.Router();
const { addFormdata, getAllDataOfForm } = require('../controllers/formcontroller');

//  Route to handle form submissions
router.post('/submitform',addFormdata);
router.get('/allPoints', getAllDataOfForm);
module.exports = router;
