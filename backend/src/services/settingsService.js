// src/services/settingsService.js
const fs = require('fs');
const path = require('path');

const SETTINGS_FILE = path.join(__dirname, '../../settings.json');

/**
 * 設定をファイルに保存する
 * @param {object} settings - 設定データ
 * @returns {Promise<void>}
 */
exports.applySettings = async (settings) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2), (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

/**
 * 設定をファイルから取得する
 * @returns {Promise<object>}
 */
exports.getSettings = async () => {
    return new Promise((resolve, reject) => {
        fs.readFile(SETTINGS_FILE, 'utf8', (err, data) => {
            if (err) {
                // ファイルが存在しない場合は初期設定を返す
                if (err.code === 'ENOENT') {
                    return resolve({
                        name: "",
                        age: 0,
                        gender: "OTHER",
                        occupation: "",
                        hobby: "",
                        allergies: [],
                    });
                }
                return reject(err);
            }
            try {
                const settings = JSON.parse(data);
                resolve(settings);
            } catch (parseErr) {
                reject(parseErr);
            }
        });
    });
};
