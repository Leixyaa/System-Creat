const express = require('express');
const { uploadBook, getBooks } = require('../controllers/bookController');

const router = express.Router();

router.post('/upload', uploadBook);
router.get('/', getBooks);

module.exports = router;
