// frontend/src/components/Chat.js
import React, { useState } from 'react';
import { TextField, Button, List, ListItem, Typography } from '@mui/material';
import axios from 'axios';
import VoiceInput from './VoiceInput';

const Chat = ({ setReloadSettings }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async (message) => {
        if (message.trim() === '') return;

        const userMessage = { sender: 'user', text: message };
        setMessages([...messages, userMessage]);

        try {
            // バックエンドにメッセージを送信
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/chat`, {
                message: message,
            });
            const systemMessage = { sender: 'system', text: response.data.reply };
            setMessages((prevMessages) => [...prevMessages, systemMessage]);

            // 設定が更新された場合、`reloadSettings`をトグル
            if (response.data.reply.includes('設定が正常に更新されました')) {
                setReloadSettings((prev) => !prev); // トグルして更新を通知
            }
        } catch (error) {
            console.error(error);
            const errorMsg = error.response?.data?.error || 'エラーが発生しました。';
            const errorMessage = { sender: 'system', text: errorMsg };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }

        setInput('');
    };

    const handleVoiceInput = (transcript) => {
        setInput(transcript); // 音声入力結果をテキストフィールドに反映
        sendMessage(transcript); // 音声入力結果をテキストフィールドに反映
    };

    return (
        <div>
            <TextField
                fullWidth
                variant="outlined"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        sendMessage(input);
                        setInput('');
                    }
                }}
                placeholder="設定内容を入力してください"
            />
            <Button variant="contained" color="primary" onClick={() => {
                sendMessage(input);
                setInput('');
            }} style={{ marginTop: '10px' }}>
                送信
            </Button>
            <VoiceInput onVoiceInput={handleVoiceInput} />
            <List>
                {messages.map((msg, index) => (
                    <ListItem key={index}>
                        <Typography variant="body1" color={msg.sender === 'user' ? 'blue' : 'green'}>
                            {msg.text}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Chat;
