// src/controllers/chatController.js
const llmService = require('../services/llmService');

/**
 * チャットメッセージを処理するエンドポイント
 */
exports.handleChat = async (req, res) => {
    const userMessage = req.body.message;
    console.log('Received message:', userMessage);

    try {
        const llmResponse = await llmService.processMessage(userMessage);
        console.log('LLM response:', llmResponse);
        res.json({ reply: llmResponse });
    } catch (error) {
        console.error('Error in handleChat:', error);
        res.status(500).json({ reply: `エラーが発生しました: ${error.message}` });
    }
};
