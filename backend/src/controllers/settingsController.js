// src/controllers/settingsController.js
const settingsService = require('../services/settingsService');

/**
 * 設定を適用するエンドポイント
 */
exports.applySettings = async (req, res) => {
    const settings = req.body;

    try {
        await settingsService.applySettings(settings);
        res.json({ status: '設定が正常に適用されました。' });
    } catch (error) {
        console.error('Error in applySettings:', error);
        res.status(400).json({ error: error.message || '設定の適用中にエラーが発生しました。' });
    }
};

/**
 * 設定を取得するエンドポイント
 */
exports.getSettings = async (req, res) => {
    try {
        const settings = await settingsService.getSettings();
        res.json(settings);
    } catch (error) {
        console.error('Error in getSettings:', error);
        res.status(500).json({ error: '設定の取得中にエラーが発生しました。' });
    }
};
