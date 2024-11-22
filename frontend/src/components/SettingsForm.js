// frontend/src/components/SettingsForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, RadioGroup, FormControlLabel, Radio, FormLabel, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import axios from 'axios';

const SettingsForm = ({ reload }) => { // `reload`プロパティを受け取る
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        occupation: '',
        hobby: '',
    });

    const [message, setMessage] = useState('');

    const occupations = ['エンジニア', 'デザイナー', 'マーケティング', '営業', 'その他'];

    useEffect(() => {
        console.log('SettingsForm mounted or reload triggered');
        // 現在の設定を取得
        const fetchSettings = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/settings`);
                setFormData({
                    name: response.data.name || '',
                    age: response.data.age || '',
                    gender: response.data.gender || '',
                    occupation: response.data.occupation || '',
                    hobby: response.data.hobby || '',
                });
                console.log('Fetched settings:', response.data); // デバッグ用ログ
            } catch (error) {
                console.error('設定の取得に失敗しました:', error);
            }
        };

        fetchSettings();
    }, [reload]); // `reload`が変更されるたびに再実行

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 必須項目のバリデーション
        if (!formData.name || !formData.age || !formData.gender) {
            setMessage('名前、年齢、性別は必須項目です。');
            return;
        }

        // 年齢のバリデーション
        if (formData.age <= 0) {
            setMessage('年齢は正の数でなければなりません。');
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/settings`, formData);
            setMessage(response.data.status);
            console.log('Settings updated:', response.data); // デバッグ用ログ
        } catch (error) {
            console.error('設定の適用に失敗しました:', error);
            const errorMsg = error.response?.data?.error || '設定の送信中にエラーが発生しました。';
            setMessage(errorMsg);
        }
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <form onSubmit={handleSubmit}>
                <TextField
                    required
                    label="名前"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    required
                    label="年齢"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <FormControl component="fieldset" margin="normal" required>
                    <FormLabel component="legend">性別</FormLabel>
                    <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                        <FormControlLabel value="男性" control={<Radio />} label="男性" />
                        <FormControlLabel value="女性" control={<Radio />} label="女性" />
                        <FormControlLabel value="その他" control={<Radio />} label="その他" />
                    </RadioGroup>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="occupation-label">職業</InputLabel>
                    <Select
                        labelId="occupation-label"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        label="職業"
                    >
                        <MenuItem value=""><em>なし</em></MenuItem>
                        {occupations.map((occ) => (
                            <MenuItem key={occ} value={occ}>{occ}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="趣味"
                    name="hobby"
                    value={formData.hobby}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                    送信
                </Button>
            </form>
            {message && <p style={{ marginTop: '10px', color: 'green' }}>{message}</p>}
        </div>
    );
};

export default SettingsForm;
