const http = require('http');
const httpProxy = require('http-proxy');

// Создаем экземпляр прокси
const proxy = httpProxy.createProxyServer({});

// Создаем HTTP-сервер, который будет слушать входящие запросы
const server = http.createServer((req, res) => {
    // Извлекаем целевой сервер из URL запроса
    const targetServer = req.headers['x-target-server'] || 'http://example.com';

    // Проксируем запрос на целевой сервер
    proxy.web(req, res, { target: targetServer });
});

// Обработка ошибок прокси
proxy.on('error', (err, req, res) => {
    console.error('Произошла ошибка при проксировании:', err);
    // res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Произошла ошибка при проксировании.');
});

// Запуск сервера на порту 8080
const port = process.env.PORT || 8080
server.listen(port, () => {
    console.log(`Прокси-сервер запущен на порту ${port}`);
});
