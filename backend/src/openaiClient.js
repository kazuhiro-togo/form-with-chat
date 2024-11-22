const { OpenAI } = require('openai');
require('dotenv').config();

// OpenAIの設定
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * OpenAI APIにリクエストを送信して応答を取得する
 * @param {string} prompt - ユーザーからのプロンプト
 * @returns {Promise<string>} - LLMからの応答
 */
const generateResponse = async (prompt, jsonSchema) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // 使用するモデルを指定（例: "gpt-4"）
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: prompt },
            ],
            response_format: {
                type: "json_schema",
                json_schema: {
                    name: "user_settings",
                    strict: true,
                    schema: jsonSchema
                }
            },
            temperature: 0.2, // 応答の創造性を低く設定
            max_tokens: 500, // 応答の最大トークン数を設定
        });

        const llmResponse = response.choices[0].message.content.trim();
        return llmResponse;
    } catch (error) {
        console.error('Error communicating with OpenAI:', error.response ? error.response.data : error.message);
        throw error;
    }
};

module.exports = { generateResponse };
