const express = require('express');
const { createUser, getUsers,loginUser  } = require('../controllers/userContoller');
const router = express.Router();

router.post('/users', createUser);
router.get('/users', getUsers);
router.post('/login', loginUser);

module.exports = router;
