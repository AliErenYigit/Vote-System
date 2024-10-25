const express = require('express');
const { voteForCandidate, getCandidateVotes,checkUserVote } = require('../controllers/voteController');
const router = express.Router();

router.post('/vote', voteForCandidate);  // Oy verme rotası
router.get('/vote/:candidateId', getCandidateVotes);  
router.get('/vote/check/:userId', checkUserVote);


module.exports = router;
