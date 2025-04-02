const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = '04f5b7bca88c481b85b155804221712'; // Замените на ваш API-ключ от WeatherAPI

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const city = req.query.city || 'Москва'; // Город по умолчанию
  try {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json`, {
      params: {
        key: API_KEY,
        q: city,
        lang: 'ru'
      }
    });
    const weatherData = response.data;
    res.render('index', { weather: weatherData });
  } catch (error) {
    console.error(error);
    res.render('index', { weather: null, error: 'Не удалось получить данные о погоде.' });
  }
});

app.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});