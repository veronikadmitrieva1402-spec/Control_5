const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
    console.log(`${new Date().toLocaleTimeString()} ${req.method} ${req.url}`);
    next();
});


const quotes = [
    { id: 1, quote: "Единственный способ сделать великую работу — любить то, что ты делаешь.", author: "Стив Джобс", category: "мотивация" },
    { id: 2, quote: "Жизнь — это то, что происходит с тобой, пока ты строишь другие планы.", author: "Джон Леннон", category: "жизнь" },
    { id: 3, quote: "Будь изменением, которое ты хочешь видеть в мире.", author: "Махатма Ганди", category: "философия" }
];

app.get('/api/quotes', (req, res) => {
    const { category } = req.query;
    let result = quotes;

    if (category) {
        result = quotes.filter(q =>
            q.category.toLowerCase().includes(category.toLowerCase())
        );
    }

    res.json({
        success: true,
        count: result.length,
        data: result
    });
});

app.get('/api/quotes/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.json({
        success: true,
        data: quotes[randomIndex]
    });
});

app.get('/api/quotes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const quote = quotes.find(q => q.id === id);

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
});


app.post('/api/quotes', (req, res) => {
    const { quote, author, category } = req.body;

    if (!quote || !author || !category) {
        return res.status(400).json({
            success: false,
            error: 'Пожалуйста, укажите цитату, автора и категорию'
        });
    }

    const newQuote = {
        id: quotes.length + 1,
        quote,
        author,
        category
    };

    res.status(201).json({
        success: true,
        message: 'Цитата успешно добавлена',
        data: newQuote
    });
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});


app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Маршрут не найден'
    });
});


app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});