// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const chatController = require('./controllers/chatController');
const settingsController = require('./controllers/settingsController');

const app = express();
const PORT = process.env.PORT || 3000;

// ミドルウェア
app.use(cors());
app.use(bodyParser.json());

// ルート
app.post('/api/chat', chatController.handleChat);
app.post('/api/applySettings', settingsController.applySettings);
app.post('/api/settings', settingsController.applySettings);
app.get('/api/settings', settingsController.getSettings);

// サーバー起動
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
