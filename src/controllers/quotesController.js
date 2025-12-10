const quotesData = require('../data/quotes.json');

exports.getAllQuotes = (req, res) => {
    const { category } = req.query;
    let filteredQuotes = quotesData;

    if (category) {
        filteredQuotes = quotesData.filter(
            quote => quote.category.toLowerCase() === category.toLowerCase()
        );
    }

    res.json({
        success: true,
        count: filteredQuotes.length,
        data: filteredQuotes
    });
};

exports.getRandomQuote = (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotesData.length);
    const randomQuote = quotesData[randomIndex];

    res.json({
        success: true,
        data: randomQuote
    });
};

exports.getQuoteById = (req, res) => {
    const { id } = req.params;
    const quote = quotesData.find(q => q.id === parseInt(id));

    if (!quote) {
        return res.status(404).json({
            success: false,
            error: `Цитата с ID ${id} не найдена`
        });
    }

    res.json({
        success: true,
        data: quote
    });
};


exports.addQuote = (req, res) => {
    const { quote, author, category } = req.body;

    if (!quote || !author || !category) {
        return res.status(400).json({
            success: false,
            error: 'Пожалуйста, укажите цитату, автора и категорию'
        });
    }

    const newQuote = {
        id: quotesData.length + 1,
        quote,
        author,
        category
    };

    res.status(201).json({
        success: true,
        message: 'Цитата успешно добавлена',
        data: newQuote
    });
};