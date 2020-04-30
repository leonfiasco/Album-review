const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../middleware/check_auth');

const AlbumsController = require('../controllers/album');

router.get('/', AlbumsController.albums_get_all );

router.post('/', checkAuth, AlbumsController.albums_create_album);

router.get('/:albumId', checkAuth, AlbumsController.albums_get_album);

router.patch('/:albumId', checkAuth, AlbumsController.albums_update_album);

router.delete('/:albumId', checkAuth, AlbumsController.albums_delete);

module.exports = router;