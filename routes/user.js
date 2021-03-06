const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check_auth');

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login);

router.delete('/:userId', checkAuth, UserController.user_delete);

router.post('/tokenIsValid', UserController.user_isLoggedIn)

router.get('/', checkAuth, UserController.get_user)


module.exports = router;