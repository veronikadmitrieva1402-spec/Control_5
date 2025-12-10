const API_URL = '/api/quotes';

const quoteContainer = document.getElementById('quote-container');

async function getRandomQuote() {
    try {
        const response = await fetch(`${API_URL}/random`);
        const data = await response.json();
        
        if (data.success) {
            showQuote(data.data);
        } else {
            showMessage('Ошибка: ' + data.error, 'error');
        }
    } catch (error) {
        showMessage('Ошибка соединения с сервером', 'error');
    }
}

async function getAllQuotes() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (data.success) {
            showAllQuotes(data.data);
        } else {
            showMessage('Ошибка: ' + data.error, 'error');
        }
    } catch (error) {
        showMessage('Ошибка соединения с сервером', 'error');
    }
}

async function getQuoteById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        
        if (data.success) {
            showQuote(data.data);
        } else {
            showMessage('Ошибка: ' + data.error, 'error');
        }
    } catch (error) {
        showMessage('Ошибка соединения с сервером', 'error');
    }
}

async function filterByCategory(category) {
    try {
        const response = await fetch(`${API_URL}?category=${encodeURIComponent(category)}`);
        const data = await response.json();
        
        if (data.success) {
            if (data.data.length > 0) {
                showAllQuotes(data.data);
            } else {
                showMessage('Цитаты по категории "' + category + '" не найдены', 'info');
            }
        } else {
            showMessage('Ошибка: ' + data.error, 'error');
        }
    } catch (error) {
        showMessage('Ошибка соединения с сервером', 'error');
    }
}

async function testPostRequest() {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                quote: "Новая тестовая цитата",
                author: "Тестовый автор",
                category: "тест"
            })
        });
        const data = await response.json();
        
        if (data.success) {
            showMessage('Цитата добавлена! ID: ' + data.data.id);
        } else {
            showMessage('Ошибка: ' + data.error);
        }
    } catch (error) {
        showMessage('Ошибка соединения с сервером');
    }
}

async function testPutRequest() {
    try {
        const response = await fetch(`${API_URL}/1`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                quote: "Обновлённая цитата",
                author: "Обновлённый автор",
                category: "обновление"
            })
        });
        const data = await response.json();
        
        if (data.success) {
            showMessage('Цитата обновлена!');
        } else {
            showMessage('Ошибка: ' + data.error);
        }
    } catch (error) {
        showMessage('Ошибка соединения с сервером');
    }
}

async function testDeleteRequest() {
    try {
        const response = await fetch(`${API_URL}/1`, {
            method: 'DELETE'
        });
        const data = await response.json();
        
        if (data.success) {
            showMessage('Цитата удалена (в демо-режиме)');
        } else {
            showMessage('Ошибка: ' + data.error);
        }
    } catch (error) {
        showMessage('Ошибка соединения с сервером');
    }
}

function showQuote(quote) {
    quoteContainer.innerHTML = `
        <div class="quote-display">
            <div class="quote-text">${quote.quote}</div>
            <div class="quote-author">${quote.author}</div>
            <div class="quote-meta">
                <span class="quote-category">${quote.category}</span>
                <span class="quote-id">ID: ${quote.id}</span>
            </div>
        </div>
    `;
}

function showAllQuotes(quotes) {
    let html = '<div class="quotes-list">';
    
    quotes.forEach(quote => {
        html += `
            <div class="quote-item">
                <div class="quote-text">${quote.quote}</div>
                <div class="quote-meta">
                    <span class="quote-author">${quote.author}</span>
                    <span class="quote-category">${quote.category}</span>
                    <span class="quote-id">ID: ${quote.id}</span>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    quoteContainer.innerHTML = html;
}

function showMessage(message) {
    quoteContainer.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <h3 style="color: #333; margin-bottom: 15px;">Сообщение</h3>
            <p style="font-size: 16px; color: #666; line-height: 1.5;">${message}</p>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Генератор цитат готов к работе');
});