const express = require('express');
const { createCandidate, getCandidates } = require('../controllers/candidateController');
const router = express.Router();

router.post('/candidates', createCandidate);  // Aday ekleme rotası
router.get('/candidates', getCandidates);    // Aday listeleme rotası

module.exports = router;
