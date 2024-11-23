const llamaClient = require('../openaiClient');
const apiSchema = require('../apiSchema.json');
const settingsService = require('./settingsService');

/**
 * ユーザーからのメッセージを処理し、設定を更新する
 * @param {string} message - ユーザーのメッセージ
 * @returns {Promise<string>} - 処理結果のメッセージ
 */
exports.processMessage = async (message) => {
    // 現在の設定を取得
    const currentSettings = await settingsService.getSettings();

    // プロンプトを作成
    const prompt = `
    あなたはシステム設定を支援するアシスタントです。以下のAPIスキーマに基づいて、ユーザーの要望に対応する設定JSONを生成してください。typeがarrayの場合、該当する値のみ返して下さい。

現在の設定:
${JSON.stringify(currentSettings, null, 2)}

APIスキーマ:
${JSON.stringify(apiSchema, null, 2)}

ユーザーの要望: ${message}
`;

    // LLMにプロンプトを送信
    const response = await llamaClient.generateResponse(prompt, apiSchema);

    // 応答がリファュージョンかどうかを確認
    if (response.includes('"refusal"')) {
        const refusalMatch = response.match(/"refusal":\s*"([^"]+)"/);
        if (refusalMatch) {
            throw new Error(refusalMatch[1]);
        } else {
            throw new Error('LLMからの応答にリファュージョンが含まれていますが、内容が不明です。');
        }
    }

    // 返されたJSONを解析
    let settingsJSON;
    console.log('LLMからの応答:', response);
    try {
        settingsJSON = JSON.parse(response);
    } catch (err) {
        // JSONが正しくない場合のエラーハンドリング
        throw new Error(response);
    }

    // 必須項目の確認
    const missingFields = checkMissingFields(settingsJSON, apiSchema);
    if (missingFields.length > 0) {
        return `以下の項目が不足しています: ${missingFields.join(', ')}`;
    }

    // 設定を適用
    await settingsService.applySettings(settingsJSON);

    return `設定が正常に更新されました。新しい設定内容:\n${JSON.stringify(settingsJSON, null, 2)}`;
};

/**
 * JSONオブジェクト内で必須項目がすべて含まれているかを確認する
 * @param {object} json - 設定JSON
 * @param {object} schema - APIスキーマ
 * @returns {string[]} - 不足している必須項目のリスト
 */
const checkMissingFields = (json, schema) => {
    const missing = [];
    if (schema.required && Array.isArray(schema.required)) {
        schema.required.forEach(field => {
            if (!(field in json)) {
                missing.push(field);
            }
        });
    }
    return missing;
};
