const express = require('express');
const router = express.Router();
const {
    getAllQuotes,
    getRandomQuote,
    getQuoteById,
    addQuote
} = require('../controllers/quotesController');

router.get('/', getAllQuotes);
router.get('/random', getRandomQuote);
router.get('/:id', getQuoteById);
router.post('/', addQuote);

module.exports = router;